<?php
/**
 * SpecialMobileDiff.php
 */

/**
 * Show the difference between two revisions of a page
 */
class SpecialMobileDiff extends MobileSpecialPage {
	/** @var boolean $hasDesktopVersion Does this special page has a desktop version? */
	protected $hasDesktopVersion = true;
	/** @var integer $revId Saves the actual revision ID */
	private $revId;
	/** @var Revision $rev Saves the revision Object of actual revision */
	private $rev;
	/** @var Revision $prevRev Saves the previous revision */
	private $prevRev;
	/** @var Title Saves the title of the actual revision */
	private $targetTitle;
	/**
	 * @var InlineDifferenceEngine|DifferenceEngine $mDiffEngine
	 * DifferenceEngine for this Diff-page
	 */
	protected $mDiffEngine;
	/** @var String $diffClass The name of the Difference class */
	protected $diffClass = 'InlineDifferenceEngine';

	/**
	 * Construct function
	 */
	public function __construct() {
		parent::__construct( 'MobileDiff' );
	}

	/**
	 * Get the revision object from ID
	 * @param integer $id ID of the wanted revision
	 * @return Revision
	 */
	public static function getRevision( $id ) {
		return Revision::newFromId( $id );
	}

	/**
	 * Generate a 404 Error message, that revisions can not be found
	 */
	public function executeBadQuery() {
		wfHttpError( 404, $this->msg( 'mobile-frontend-diffview-404-title' )->text(),
			$this->msg( 'mobile-frontend-diffview-404-desc' )->text() );
	}

	/**
	 * Takes 2 ids/keywords and validates them returning respective revisions
	 *
	 * @param int[] $revids Array of revision ids currently limited to 2 elements
	 * @return Revision[] Array of previous and next revision. The next revision is null if
	 *   a bad parameter is passed
	 */
	public function getRevisionsToCompare( $revids ) {
		$prev = null;
		$rev = null;

		// check 2 parameters are passed and are numbers
		if ( count( $revids ) === 2 && $revids[0] && $revids[1] ) {
			$id = intval( $revids[1] );
			$prevId = intval( $revids[0] );
			if ( $id && $prevId ) {
				$rev = static::getRevision( $id );
				// deal with identical ids
				if ( $id === $prevId ) {
					$rev = null;
				} elseif ( $rev ) {
					$prev = static::getRevision( $prevId );
					if ( !$prev ) {
						$rev = null;
					}
				} else {
					$rev = null;
				}
			}
		} elseif ( count( $revids ) === 1 ) {
			$id = intval( $revids[0] );
			if ( $id ) {
				$rev = static::getRevision( $id );
				if ( $rev ) {
					$prev = $rev->getPrevious();
				}
			}
		}
		return [ $prev, $rev ];
	}

	/**
	 * Render the diff page
	 * @return boolean false when revision not exist
	 * @param string $par Revision IDs separated by three points (e.g. 123...124)
	 */
	function executeWhenAvailable( $par ) {
		$ctx = MobileContext::singleton();
		$this->setHeaders();
		$output = $this->getOutput();

		// @FIXME add full support for git-style notation (eg ...123, 123...)
		$revisions = $this->getRevisionsToCompare( explode( '...', $par ) );
		$rev = $revisions[1];
		$prev = $revisions[0];

		if ( is_null( $rev ) ) {
			$this->executeBadQuery();
			return false;
		}
		$this->revId = $rev->getId();
		$this->rev = $rev;
		$this->prevRev = $prev;
		$this->targetTitle = $this->rev->getTitle();
		$this->getSkin()->setRelevantTitle( $this->targetTitle );

		$output->setPageTitle( $this->msg(
			'mobile-frontend-diffview-title',
			$this->targetTitle->getPrefixedText()
		) );

		$output->addModuleStyles( [
			'skins.minerva.icons.images.scripts',
			'mobile.pagesummary.styles',
			// @todo FIXME: Don't add these styles. This is only needed for the user
			// icon to the left of the username
			'mobile.special.pagefeed.styles'
		] );
		$output->addModules( 'mobile.special.mobilediff.images' );

		// Allow other extensions to load more stuff here
		Hooks::run( 'BeforeSpecialMobileDiffDisplay', [ &$output, $ctx, $revisions ] );

		$output->addHtml( '<div id="mw-mf-diffview" class="content-unstyled"><div id="mw-mf-diffarea">' );

		$this->setupDifferenceEngine();
		$this->showHeader();
		$this->showDiff();
		$output->addHtml( '</div>' );

		$this->showFooter( $ctx );

		$output->addHtml( '</div>' );

		return true;
	}

	/**
	 * Returns the ID of the previous Revision, if it is set, otherwise 0.
	 *
	 * @return int|null
	 */
	protected function getPrevId() {
		return $this->prevRev ? $this->prevRev->getId() : 0;
	}

	/**
	 * Setups the DifferenceEngine.
	 */
	protected function setupDifferenceEngine() {
		$contentHandler = $this->rev->getContentHandler();
		$de = $contentHandler->createDifferenceEngine( $this->getContext(), $this->getPrevId(),
			$this->revId );
		// HACK:
		if ( get_class( $de ) == 'DifferenceEngine' ) {
			$de = new $this->diffClass(
				$this->getContext(),
				$this->getPrevId(),
				$this->revId,
				0,
				false,
				(bool)$this->getRequest()->getVal( 'unhide' )
			);
		} else {
			$de->showDiffPage();
			return;
		}
		$this->mDiffEngine = $de;
	}

	/**
	 * Render the header of a diff page including:
	 * Name with url to page
	 * Bytes added/removed
	 * Day and time of edit
	 * Edit Comment
	 */
	function showHeader() {
		$title = $this->targetTitle;

		if ( $this->prevRev ) {
			$bytesChanged = $this->rev->getSize() - $this->prevRev->getSize();
		} else {
			$bytesChanged = $this->rev->getSize();
		}
		if ( $bytesChanged > 0 ) {
			$changeMsg = 'mobile-frontend-diffview-bytesadded';
			$sizeClass = MobileUI::iconClass( 'bytesadded', 'before',
				'meta mw-mf-bytesadded mw-ui-icon-small' );
		} elseif ( $bytesChanged === 0 ) {
			$changeMsg = 'mobile-frontend-diffview-bytesnochange';
			$sizeClass = MobileUI::iconClass( 'bytesneutral', 'before',
				'meta mw-mf-bytesneutral mw-ui-icon-small' );
		} else {
			$changeMsg = 'mobile-frontend-diffview-bytesremoved';
			$sizeClass = MobileUI::iconClass( 'bytesremoved', 'before',
				'meta mw-mf-bytesremoved mw-ui-icon-small' );
			$bytesChanged = abs( $bytesChanged );
		}

		if ( $this->rev->isMinor() ) {
			$minor = ChangesList::flag( 'minor' );
		} else {
			$minor = '';
		}
		if ( $this->rev->getComment() !== '' ) {
			$comment = Linker::formatComment( $this->rev->getComment(), $title );
		} else {
			$comment = $this->msg( 'mobile-frontend-changeslist-nocomment' )->escaped();
		}

		$ts = new MWTimestamp( $this->rev->getTimestamp() );
		$this->getOutput()->addHtml(
			Html::openElement( 'div', [ 'id' => 'mw-mf-diff-info', 'class' => 'page-summary' ] )
				. Html::openElement( 'h2', [] )
				. Html::element( 'a',
					[
						'href' => $title->getLocalURL(),
					],
					$title->getPrefixedText()
				)
				. Html::closeElement( 'h2' )
				. $this->msg( 'mobile-frontend-diffview-comma' )->rawParams(
					Html::element( 'span', [ 'class' => $sizeClass ],
						$this->msg( $changeMsg )->numParams( $bytesChanged )->text()
					),
					Html::element(
						'span', [ 'class' => 'mw-mf-diff-date meta' ],
						$this->getLanguage()->getHumanTimestamp( $ts )
					)
				)->text()
			. Html::closeElement( 'div' )
			. $minor
			. Html::rawElement(
				'div',
				[ 'id' => 'mw-mf-diff-comment' ],
				$comment
			)
		);

		if ( $this->mDiffEngine instanceof InlineDifferenceEngine ) {
			// TODO: The hook gets originally called in the DifferenceEngine::showDiffPage() method
			Hooks::run( 'DiffViewHeader', [ $this->mDiffEngine, $this->prevRev, $this->rev ] );
		}
	}

	/**
	 * Render the inline difference between two revisions
	 * using InlineDiffEngine
	 */
	function showDiff() {
		$output = $this->getOutput();

		$prevId = $this->getPrevId();
		$unhide = (bool)$this->getRequest()->getVal( 'unhide' );
		$de = $this->mDiffEngine;
		$diff = $de->getDiffBody();
		if ( !$prevId ) {
			$audience = $unhide ? Revision::FOR_THIS_USER : Revision::FOR_PUBLIC;
			$diff = '<ins>'
				. nl2br(
					htmlspecialchars(
						ContentHandler::getContentText( $this->rev->getContent( $audience ) )
					)
				)
				. '</ins>';
		}

		$warnings = $de->getWarningMessageText();
		if ( $warnings ) {
			$warnings = MobileUI::warningBox( $warnings );
		}
		$output->addHtml(
			$warnings .
			'<div id="mw-mf-minidiff">' .
			$diff .
			'</div>'
		);
		$prev = $this->rev->getPrevious();
		$next = $this->rev->getNext();
		if ( $prev || $next ) {
			$history = Html::openElement( 'ul', [ 'class' => 'hlist revision-history-links' ] );
			if ( $prev ) {
				$history .= Html::openElement( 'li' ) .
					Html::element( 'a', [
						'href' => SpecialPage::getTitleFor( 'MobileDiff', $prev->getId() )->getLocalUrl()
					], $this->msg( 'previousdiff' ) ) . Html::closeElement( 'li' );
			}
			if ( $next ) {
				$history .= Html::openElement( 'li' ) .
					Html::element( 'a', [
						'href' => SpecialPage::getTitleFor( 'MobileDiff', $next->getId() )->getLocalUrl()
					], $this->msg( 'nextdiff' ) ) . Html::closeElement( 'li' );
			}
			$history .= Html::closeElement( 'ul' );
			$output->addHtml( $history );
		}

		if ( $de instanceof InlineDifferenceEngine ) {
			$output->addHtml( Html::rawElement(
				'div',
				[
					'class' => 'patrollink'
				],
				$de->getPatrolledLink()
			) );
		}
	}

	/**
	 * Render the footer including userinfos (Name, Role, Editcount)
	 *
	 * @param IContextSource $context Context
	 */
	private function showFooter( IContextSource $context ) {
		$output = $this->getOutput();

		$output->addHtml(
			Html::openElement( 'div', [ 'id' => 'mw-mf-userinfo',
				'class' => 'position-fixed' ] ) .
			Html::openElement( 'div', [ 'class' => 'post-content' ] )
		);

		$userId = $this->rev->getUser();
		if ( $userId ) {
			$user = User::newFromId( $userId );
			$edits = $user->getEditCount();
			$attrs = [
				'class' => MobileUI::iconClass( 'user', 'before', 'mw-mf-user icon-16px' ),
				'data-revision-id' => $this->revId,
				'data-user-name' => $user->getName(),
				'data-user-gender' => $user->getOption( 'gender' ),
			];
			$output->addHtml(
				Html::openElement( 'div', $attrs ) .
				$this->getLinkRenderer()->makeLink(
					$user->getUserPage(),
					$user->getName(),
					[ 'class' => 'mw-mf-user-link' ]
				) .
				'</div>' .
				'<div class="mw-mf-roles meta">' .
					$this->listGroups( $user, $context ) .
				'</div>' .
				'<div class="mw-mf-edit-count meta">' .
					$this->msg(
						'mobile-frontend-diffview-editcount',
						$this->getLanguage()->formatNum( $edits )
					)->parse() .
				'</div>'
			);
		} else {
			$ipAddr = $this->rev->getUserText();
			$userPage = SpecialPage::getTitleFor( 'Contributions', $ipAddr );
			$output->addHtml(
				Html::element( 'div', [
					'class' =>  MobileUI::iconClass( 'anonymous', 'before', 'mw-mf-user icon-16px mw-mf-anon' ),
				], $this->msg( 'mobile-frontend-diffview-anonymous' ) ) .
				'<div>' .
					$this->getLinkRenderer()->makeLink( $userPage, $ipAddr ) .
				'</div>'
			);
		}

		$output->addHtml(
			Html::closeElement( 'div' ) .
			Html::closeElement( 'div' )
		);
	}

	/**
	 * Get the list of groups of user
	 * @param User $user The user object to get the list from
	 * @param IContextSource $context The context
	 * @return string comma separated list of user groups
	 */

	private function listGroups( User $user, IContextSource $context ) {
		// Get groups to which the user belongs
		$userGroups = $user->getGroups();
		$userMembers = [];
		foreach ( $userGroups as $group ) {
			$userMembers[] = UserGroupMembership::getLink( $group, $context, 'html' );
		}

		return $this->getLanguage()->commaList( $userMembers );
	}

	/**
	 * Get the url for the mobile diff special page to use in Desktop footer
	 * @return boolean|string Return URL or false when revision id's not set
	 */
	public static function getMobileUrlFromDesktop() {
		$req = MobileContext::singleton()->getRequest();
		$rev2 = $req->getText( 'diff' );
		$rev1 = $req->getText( 'oldid' );
		if ( $rev1 == 'prev' || $rev1 == 'next' ) { // Actually, both do the same, WTF
			$rev1 = '';
		}
		// redirect requests to the diff page to mobile view
		if ( !$rev2 ) {
			if ( $rev1 ) {
				$rev2 = $rev1;
				$rev1 = '';
			} else {
				return false;
			}
		}

		if ( $rev1 ) {
			$rev = static::getRevision( $rev1 );
			if ( $rev ) {
				// the diff parameter could be the string prev or next - deal with these cases
				if ( $rev2 === 'prev' ) {
					$prev = $rev->getPrevious();
					// yes this is confusing - this is how it works arrgghh
					$rev2 = $rev1;
					$rev1 = $prev ? $prev->getId() : '';
				} elseif ( $rev2 === 'next' ) {
					$next = $rev->getNext();
					$rev2 = $next ? $next->getId() : '';
				} else {
					$rev2 = static::getRevision( $rev2 );
					$rev2 = $rev2 ? $rev2->getId() : '';
				}
			} else {
				$rev2 = '';
			}
		}

		if ( $rev2 ) {
			$subpage = $rev1 ? $rev1 . '...' . $rev2 : $rev2;
			$title = SpecialPage::getTitleFor( 'MobileDiff', $subpage );
			return $title->getLocalURL();
		}
		return false;
	}

	/**
	 * Get the URL for Desktop version of difference view
	 * @param string $subPage URL of mobile diff page
	 * @return string Url to mobile diff page
	 */
	public function getDesktopUrl( $subPage ) {
		$parts = explode( '...', $subPage );
		if ( count( $parts ) > 1 ) {
			$params = [ 'diff' => $parts[1], 'oldid' => $parts[0] ];
		} else {
			$params = [ 'diff' => $parts[0] ];
		}
		if ( $this->getRequest()->getVal( 'unhide' ) ) {
			$params['unhide'] = 1;
		}
		return wfAppendQuery( wfScript(), $params );
	}
}
