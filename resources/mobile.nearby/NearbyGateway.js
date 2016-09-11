( function ( M, $ ) {
	var limit = 50,
		Page = M.require( 'mobile.startup/Page' ),
		ns = mw.config.get( 'wgMFContentNamespace' ),
		extendSearchParams = M.require( 'mobile.search.util/extendSearchParams' );

	/**
	 * API for retrieving nearby pages
	 * @class NearbyGateway
	 * @param {Object} options
	 * @param {mw.Api} options.api
	 */
	function NearbyGateway( options ) {
		this.api = options.api;
	}

	NearbyGateway.prototype = {
		/**
		 * Returns a human readable string stating the distance in meters or kilometers
		 * depending on size.
		 * @method
		 * @private
		 * @param {Number} d The distance in meters.
		 * @return {String} message stating how far the user is from the point of interest.
		 */
		_distanceMessage: function ( d ) {
			if ( d < 1 ) {
				d *= 100;
				d = Math.ceil( d ) * 10;
				if ( d === 1000 ) {
					d = 1;
				} else {
					return mw.msg( 'mobile-frontend-nearby-distance-meters', mw.language.convertNumber( d ) );
				}
			} else {
				if ( d > 2 ) {
					d *= 10;
					d = Math.ceil( d ) / 10;
					d = d.toFixed( 1 );
				} else {
					d *= 100;
					d = Math.ceil( d ) / 100;
					d = d.toFixed( 2 );
				}
			}
			return mw.msg( 'mobile-frontend-nearby-distance', mw.language.convertNumber( d ) );
		},
		/**
		 * Returns a list of pages around a given point
		 * @method
		 * @param {Object} coords In form { latitude: 0, longitude: 2 }
		 * @param {Number} range Number of meters to perform a geosearch for
		 * @param {String} exclude Name of a title to exclude from the list of results
		 * @return {jQuery.Deferred} Object taking list of pages as argument
		 */
		getPages: function ( coords, range, exclude ) {
			return this._search( {
				ggscoord: [ coords.latitude, coords.longitude ]
			}, range, exclude );
		},

		/**
		 * Gets the pages around a page. It excludes itself from the search
		 * @method
		 * @param {String} page Page title like "W_San_Francisco"
		 * @param {Number} range Number of meters to perform a geosearch for
		 * @return {jQuery.Deferred} Object taking list of pages as argument
		 */
		getPagesAroundPage: function ( page, range ) {
			return this._search( {
				ggspage: page
			}, range, page );
		},

		/**
		 * Searches for pages nearby
		 * @method
		 * @private
		 * @param {Object} params Parameters to use for searching
		 * @param {Number} range Number of meters to perform a geosearch for
		 * @param {String} exclude Name of a title to exclude from the list of results
		 * @return {jQuery.Deferred} Object taking list of pages as argument
		 */
		_search: function ( params, range, exclude ) {
			var requestParams,
				d = $.Deferred(),
				self = this;

			requestParams = extendSearchParams( 'nearby', {
				colimit: 'max',
				prop: [ 'coordinates' ],
				generator: 'geosearch',
				ggsradius: range,
				ggsnamespace: ns,
				ggslimit: limit,
				formatversion: 2
			}, params );

			if ( params.ggscoord ) {
				requestParams.codistancefrompoint = params.ggscoord;
			} else if ( params.ggspage ) {
				requestParams.codistancefrompage = params.ggspage;
			}

			this.api.ajax( requestParams ).then( function ( resp ) {
				var pages;
				if ( resp.query ) {
					pages = resp.query.pages || [];
				} else {
					pages = [];
				}

				pages = $.map( pages, function ( page, i ) {
					var coords, p;
					p = Page.newFromJSON( page );
					p.anchor = 'item_' + i;

					if ( page.coordinates ) { // FIXME: protect against bug T49133 (remove when resolved)
						coords = page.coordinates[0];
						// FIXME: Make part of the Page object
						p.dist = coords.dist / 1000;
						p.latitude = coords.lat;
						p.longitude = coords.lon;
						p.proximity = self._distanceMessage( p.dist );
					} else {
						p.dist = 0;
					}
					if ( exclude !== page.title ) {
						return p;
					}
				} );

				pages.sort( function ( a, b ) {
					return a.dist > b.dist ? 1 : -1;
				} );
				d.resolve( pages );
			}, function ( error, details ) {
				if ( details && details.error && details.error.info ) {
					d.reject( error, details.error.info );
				} else {
					d.reject( error, '' );
				}
			} );

			return d;
		}
	};

	M.define( 'mobile.nearby/NearbyGateway', NearbyGateway );
}( mw.mobileFrontend, jQuery ) );
