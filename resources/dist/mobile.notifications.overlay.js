this.mfModules=this.mfModules||{},this.mfModules["mobile.notifications.overlay"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"./src/mobile.notifications.overlay/NotificationsFilterOverlay.js":function(i,e,o){var t,n=o("./src/mobile.startup/Overlay.js"),a=o("./src/mobile.startup/util.js");o("./src/mobile.startup/mfExtend.js")(t=function(i){var e=this;n.call(this,a.extend({className:"overlay notifications-filter-overlay notifications-overlay navigation-drawer"},i)),this.on("hide",function(){i.mainMenu.closeNavigationDrawers()}),i.$crossWikiUnreadFilter.on("click",function(){e.hide()}),i.$notifReadState.find(".oo-ui-buttonElement").on("click",function(){e.hide()}),this.$el.find(".overlay-content").append(this.parseHTML("<div>").addClass("notifications-filter-overlay-read-state").append(i.$notifReadState),i.$crossWikiUnreadFilter)},n,{defaults:a.extend({},n.prototype.defaults,{heading:mw.msg("mobile-frontend-notifications-filter-title")}),preRender:function(){this.options.heading="<strong>"+mw.message("mobile-frontend-notifications-filter-title").escaped()+"</strong>"}}),i.exports=t},"./src/mobile.notifications.overlay/list.js":function(i,e,o){var t=o("./src/mobile.startup/util.js"),n=o("./src/mobile.startup/View.js"),a=o("./src/mobile.startup/promisedView.js");i.exports=function(i,e,o,s){var r,l=mw.config.get("wgEchoMaxNotificationCount"),c=new i.api.EchoApi,f=new i.dm.UnreadNotificationCounter(c,"all",l),d=new i.dm.ModelManager(f,{type:["message","alert"]}),m=new i.Controller(c,d,{type:["message","alert"]}),u=function(){e.toggle(m.manager.hasLocalUnread())},p=t.parseHTML("<div>").addClass("notifications-overlay-overlay position-fixed");return i.config.maxPrioritizedActions=1,r=new i.ui.NotificationsWrapper(m,d,{$overlay:p}),f.on("countChange",function(i){o(m.manager.getUnreadCounter().getCappedNotificationCount(i)),u()}),e.on("click",function(){var i=m.manager.getLocalUnread().length;m.markLocalNotificationsRead().then(function(){mw.notify(mw.msg("echo-mark-all-as-read-confirmation",i)),e.toggle(!1)},function(){e.toggle(!1)})}),a(r.populate().then(function(){return m.updateSeenTime(),s(),u(),d.on("update",u),n.make({},[r.$element,p])}))}},"./src/mobile.notifications.overlay/mobile.notifications.overlay.js":function(i,e,o){var t=o("./src/mobile.startup/moduleLoaderSingleton.js"),n=o("./src/mobile.notifications.overlay/list.js"),a=o("./src/mobile.notifications.overlay/NotificationsFilterOverlay.js");t.define("mobile.notifications.overlay",{list:n,echo:function(){return mw.echo}}),t.define("mobile.notifications.overlay/NotificationsFilterOverlay",a)}},[["./src/mobile.notifications.overlay/mobile.notifications.overlay.js",0,1]]]);
//# sourceMappingURL=mobile.notifications.overlay.js.map.json