( function ( M, $ ) {
	var MainMenu = M.require( 'mobile.mainMenu/MainMenu' ),
		// FIXME: Cleanup when cache clears
		menuData = mw.config.get( 'wgMinervaMenuData' ) || mw.config.get( 'wgMFMenuData' ),
		mainMenu = new MainMenu( $.extend( menuData, {
			activator: '.header .main-menu-button'
		} ) );

	$( function () {
		if ( !$( '#mw-mf-page-left' ).find( '.menu' ).length ) {
			// Now we have a main menu button register it.
			mainMenu.registerClickEvents();
			mainMenu.appendTo( '#mw-mf-page-left' );
		}
	} );

	M.define( 'skins.minerva.scripts.top/mainMenu', mainMenu )
		// Used by Gather
		.deprecate( 'skins.minerva.scripts/mainMenu' );
}( mw.mobileFrontend, jQuery ) );
