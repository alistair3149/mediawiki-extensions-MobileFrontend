<?php
/**
 * MinervaTemplateBeta.php
 */

/**
 * Alternative Minerva template sent to users who have opted into the
 * beta mode via Special:MobileOptions
 */
class MinervaTemplateBeta extends MinervaTemplate {
	/** {@inheritdoc} */
	protected $renderHistoryLinkBeforeContent = false;
	/**
	 * @var string $searchPlaceHolderMsg Message used as placeholder in search input
	 */
	protected $searchPlaceHolderMsg = 'mobile-frontend-placeholder-beta';

	/**
	 * Render available page actions
	 * @param array $data Data used to build page actions
	 */
	public function renderPageActions( $data ) {
		if ( !$this->isMainPage ) {
			parent::renderPageActions( $data );
		}
	}

	/**
	 * Get page secondary actions
	 */
	protected function getSecondaryActions() {
		$donationUrl = $this->getSkin()->getMFConfig()->get( 'MFDonationUrl' );

		$result = parent::getSecondaryActions();

		if ( $donationUrl && !$this->isSpecialPage ) {
			$result['donation'] = array(
				'attributes' => array(
					'href' => $donationUrl,
				),
				'label' => wfMessage( 'mobile-frontend-donate-button-label' )->text()
			);
		}
		return $result;
	}

	/**
	 * Renders the list of page actions and then the title of the page in its
	 * container to keep LESS changes to a minimum.
	 *
	 * @param array $data
	 */
	protected function renderPreContent( $data ) {
		$internalBanner = $data[ 'internalBanner' ];
		$preBodyText = isset( $data['prebodytext'] ) ? $data['prebodytext'] : '';

		if ( $internalBanner || $preBodyText ) {

			?>
			<div class="pre-content">
				<?php
				if ( !$this->isSpecialPage ) {
					$this->renderPageActions( $data );
				}
				echo $preBodyText;
				// FIXME: Temporary solution until we have design
				if ( isset( $data['_old_revision_warning'] ) ) {
					echo $data['_old_revision_warning'];
				}
				echo $internalBanner;
				?>
			</div>
			<?php
		}
	}

	/** @inheritdoc */
	protected function renderPostContent( $data ) {
		echo $this->renderBrowseTags( $data );
	}

	/**
	 * Renders the tags assigned to the page as part of the Browse experiment.
	 *
	 * @param array $data The data used to build the page
	 * @return string The HTML representing the tags section
	 */
	protected function renderBrowseTags( $data ) {
		if ( !isset( $data['browse_tags'] ) || !$data['browse_tags'] ) {
			return '';
		}

		$browseTags = $this->getSkin()->getMFConfig()->get( 'MFBrowseTags' );
		$baseLink = SpecialPage::getTitleFor( 'TopicTag' )->getLinkURL();

		// TODO: Create tag entity and view.
		$tags = array_map( function ( $rawTag ) use ( $browseTags, $baseLink ) {
			return array(
				'msg' => $rawTag,
				// replace spaces with underscores in the tag name
				'link' => $baseLink . '/' . str_replace( ' ', '_', $rawTag )
			);

		}, $data['browse_tags'] );

		// FIXME: This should be in MinervaTemplate#getTemplateParser.
		$templateParser = new TemplateParser( __DIR__ . '/../../resources' );

		return $templateParser->processTemplate( 'mobile.browse/tags', array(
			'headerMsg' => wfMessage( 'mobile-frontend-browse-tags-header' )->text(),
			'tags' => $tags,
		) );
	}
}
