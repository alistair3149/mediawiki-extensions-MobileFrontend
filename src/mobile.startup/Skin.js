var
	browser = require( './Browser' ).getSingleton(),
	lazyImageLoader = require( './lazyImages/lazyImageLoader' ),
	lazyImageTransformer = require( './lazyImages/lazyImageTransformer' ),
	lazyReferencesLoader = require( './lazyReferencesLoader' ),
	View = require( './View' ),
	util = require( './util' ),
	mfExtend = require( './mfExtend' );

/**
 * Representation of the current skin being rendered.
 *
 * @class Skin
 * @extends View
 * @uses Browser
 * @uses Page
 * @fires Skin#click
 * @fires Skin#references-loaded
 * @fires Skin#changed
 * @param {Object} params Configuration options
 * @param {OO.EventEmitter} params.eventBus Object used to listen for
 * scroll:throttled, resize:throttled, and section-toggled events
 */
function Skin( params ) {
	var self = this,
		options = util.extend( {}, params );

	this.page = options.page;
	this.name = options.name;
	if ( options.mainMenu ) {
		this.mainMenu = options.mainMenu;
		mw.log.warn( 'Skin: Use of mainMenu is deprecated.' );
	}
	this.eventBus = options.eventBus;
	options.isBorderBox = false;
	View.call( this, options );
	this.referencesGateway = options.referencesGateway;

	if (
		mw.config.get( 'wgMFLazyLoadImages' )
	) {
		util.docReady( function () {
			var
				container = document.getElementById( 'content' ),
				// todo: remove when tests are only headless. There is no #content in
				//       Special:JavaScriptTest.
				images = ( container && lazyImageLoader.queryPlaceholders( container ) ) || [];
			self.lazyImageTransformer = lazyImageTransformer.newLazyImageTransformer(
				// eslint false positive: self.$ is not a jQuery collection
				// eslint-disable-next-line jquery/no-bind
				self.eventBus, self.$.bind( self ), util.getWindow().height() * 1.5, images
			);
			self.lazyImageTransformer.loadImages();
		} );
	}

	if ( mw.config.get( 'wgMFLazyLoadReferences' ) ) {
		this.eventBus.on( 'section-toggled', function ( data ) {
			lazyReferencesLoader.loadReferences(
				self.eventBus, data, self.referencesGateway, self.page
			);
		} );
	}
}

mfExtend( Skin, View, {
	/**
	 * @memberof Skin
	 * @instance
	 * @mixes View#defaults
	 * @property {Object} defaults Default options hash.
	 * @property {Page} defaults.page page the skin is currently rendering
	 * @property {ReferencesGateway} defaults.referencesGateway instance of references gateway
	 */
	defaults: {
		page: undefined
	},

	/**
	 * @inheritdoc
	 * @memberof Skin
	 * @instance
	 */
	events: {},

	/**
	 * @inheritdoc
	 * @memberof Skin
	 * @instance
	 */
	postRender: function () {
		var $el = this.$el;
		if ( browser.supportsAnimations() ) {
			$el.addClass( 'animations' );
		}
		if ( browser.supportsTouchEvents() ) {
			$el.addClass( 'touch-events' );
		}
		util.parseHTML( '<div class="transparent-shield cloaked-element">' )
			.appendTo( $el.find( '#mw-mf-page-center' ) );
		if ( this.lazyImageTransformer ) {
			this.lazyImageTransformer.loadImages();
		}

		/**
		 * Fired when the skin is clicked.
		 * @event Skin#click
		 */
		this.$( '#mw-mf-page-center' ).on( 'click', this.emit.bind( this, 'click' ) );
	},

	/**
	 * Returns the appropriate license message including links/name to
	 * terms of use (if any) and license page
	 * @memberof Skin
	 * @instance
	 * @return {string}
	 */
	getLicenseMsg: function () {
		var licenseMsg,
			mfLicense = mw.config.get( 'wgMFLicense' ),
			licensePlural = mw.language.convertNumber( mfLicense.plural );

		if ( mfLicense.link ) {
			if ( this.$( '#footer-places-terms-use' ).length > 0 ) {
				licenseMsg = mw.msg(
					'mobile-frontend-editor-licensing-with-terms',
					mw.message(
						'mobile-frontend-editor-terms-link',
						this.$( '#footer-places-terms-use a' ).attr( 'href' )
					).parse(),
					mfLicense.link,
					licensePlural
				);
			} else {
				licenseMsg = mw.msg(
					'mobile-frontend-editor-licensing',
					mfLicense.link,
					licensePlural
				);
			}
		}
		return licenseMsg;
	}
} );

module.exports = Skin;
