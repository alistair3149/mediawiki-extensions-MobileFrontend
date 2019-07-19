this.mfModules=this.mfModules||{},this.mfModules["mobile.startup"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./src/mobile.startup/Toggler.js":function(e,t,s){var r=s("./src/mobile.startup/Browser.js").getSingleton(),n=s("./src/mobile.startup/util.js"),a=n.escapeHash,i={name:"arrow",additionalClassNames:"indicator"},o=s("./src/mobile.startup/Icon.js");function c(e){this.eventBus=e.eventBus,this._enable(e.$container,e.prefix,e.page,e.isClosed)}function l(e){var t=JSON.parse(mw.storage.get("expandedSections")||"{}");return t[e.title]=t[e.title]||{},t}function u(e){mw.storage.set("expandedSections",JSON.stringify(e))}function h(e,t,s){var r,n,a=l(s);t.find(".section-heading span").each(function(){n=t.find(this),r=n.parents(".section-heading"),a[s.title][n.attr("id")]&&!r.hasClass("open-block")&&e.toggle(r,s)})}function d(e){var t=(new Date).getTime(),s=l(e);Object.keys(s).forEach(function(e){var r=s[e];Object.keys(r).forEach(function(n){var a=r[n];Math.floor((t-a)/1e3/60/60/24)>=1&&delete s[e][n]})}),u(s)}c.prototype.toggle=function(e,t){var s,n=e.is(".open-block"),a=e.next();e.toggleClass("open-block"),e.data("indicator").remove(),i.rotation=n?0:180,s=new o(i).prependTo(e),e.data("indicator",s),a.toggleClass("open-block").attr({"aria-pressed":!n,"aria-expanded":!n}),this.eventBus.emit("section-toggled",{expanded:n,isReferenceSection:Boolean(a.attr("data-is-reference-section")),$heading:e}),r.isWideScreen()||function(e,t){var s=e.find("span").attr("id"),r=e.hasClass("open-block"),n=l(t);s&&(r?n[t.title][s]=(new Date).getTime():delete n[t.title][s],u(n))}(e,t)},c.prototype.reveal=function(e,t,s){var r,n;try{(n=(r=t.find(a(e))).parents(".collapsible-heading")).length||(n=r.parents(".collapsible-block").prev(".collapsible-heading")),n.length&&!n.hasClass("open-block")&&this.toggle(n,s),n.length&&window.scrollTo(0,r.offset().top)}catch(e){}},c.prototype._enable=function(e,t,s,a){var c,l,u,p,m,g=this,f=mw.config.get("wgMFCollapseSectionsByDefault");function b(){var t=window.location.hash;0===t.indexOf("#")&&g.reveal(decodeURIComponent(t),e,s)}c=e.find("> h1,> h2,> h3,> h4,> h5,> h6,.section-heading").eq(0).prop("tagName")||"H1",void 0===f&&(f=!0),l=!f||"true"===mw.storage.get("expandSections"),e.children(c).each(function(n){var c,h=e.find(this),d=h.find(".indicator"),m=t+"collapsible-block-"+n;h.next().is("div")&&(p=h.next("div"),c=Boolean(p.attr("data-is-reference-section")),h.addClass("collapsible-heading ").data("section-number",n).attr({tabindex:0,"aria-haspopup":"true","aria-controls":m}).on("click",function(e){e.target.href||(e.preventDefault(),g.toggle(h,s))}),i.rotation=l?180:0,u=new o(i),d.length?d.replaceWith(u.$el):u.prependTo(h),h.data("indicator",u.$el),p.addClass("collapsible-block").eq(0).attr({id:m,"aria-pressed":"false","aria-expanded":"false"}),function(e,t,s){t.on("keypress",function(r){13!==r.which&&32!==r.which||e.toggle(t,s)}).find("a").on("keypress mouseup",function(e){e.stopPropagation()})}(g,h,s),!c&&(!a&&r.isWideScreen()||l)&&g.toggle(h,s))}),function(){var t=mw.config.get("wgInternalRedirectTargetUrl"),r=!!t&&t.split("#")[1];r&&(window.location.hash=r,g.reveal(r,e,s))}(),b(),(m=e.find("a:not(.reference a)")).on("click",function(){void 0!==m.attr("href")&&m.attr("href").indexOf("#")>-1&&b()}),n.getWindow().on("hashchange",function(){b()}),!r.isWideScreen()&&s&&(h(this,e,s),d(s))},c._getExpandedSections=l,c._expandStoredSections=h,c._cleanObsoleteStoredSections=d,e.exports=c},"./src/mobile.startup/languageOverlay/getDeviceLanguage.js":function(e,t){e.exports=function(e){var t=e.languages?e.languages[0]:e.language||e.userLanguage||e.browserLanguage||e.systemLanguage;return t?t.toLowerCase():void 0}},"./src/mobile.startup/languageOverlay/languageOverlay.js":function(e,t,s){var r=s("./src/mobile.startup/moduleLoaderSingleton.js"),n=s("./src/mobile.startup/languageOverlay/getDeviceLanguage.js"),a=s("./src/mobile.startup/Overlay.js"),i=s("./src/mobile.startup/promisedView.js");function o(e){return mw.loader.using("mobile.languages.structured").then(function(){return e.getPageLanguages(mw.config.get("wgPageName"),mw.config.get("wgUserLanguage"))}).then(function(e){return new(r.require("mobile.languages.structured/LanguageSearcher"))({languages:e.languages,variants:e.variants,deviceLanguage:n(navigator)})})}function c(e){return a.make({heading:mw.msg("mobile-frontend-language-heading"),className:"overlay language-overlay"},i(o(e)))}c.test={loadLanguageSearcher:o},e.exports=c},"./src/mobile.startup/mediaViewer/overlay.js":function(e,t,s){var r=s("./src/mobile.startup/moduleLoaderSingleton.js"),n=s("./src/mobile.startup/promisedView.js"),a=s("./src/mobile.startup/util.js"),i=s("./src/mobile.startup/headers.js").header,o=s("./src/mobile.startup/icons.js"),c=s("./src/mobile.startup/Overlay.js");e.exports=function(e){return c.make({headers:[i("",[],o.cancel("gray"))],className:"overlay media-viewer"},n(a.Promise.all([mw.loader.using("mobile.mediaViewer")]).then(function(){return new(0,r.require("mobile.mediaViewer").ImageCarousel)(e)})))}},"./src/mobile.startup/mobile.startup.js":function(e,t,s){var r=s("./src/mobile.startup/moduleLoaderSingleton.js"),n=s("./src/mobile.startup/search/schemaMobileWebSearch.js");e.exports={moduleLoader:r,mfExtend:s("./src/mobile.startup/mfExtend.js"),context:s("./src/mobile.startup/context.js"),time:s("./src/mobile.startup/time.js"),util:s("./src/mobile.startup/util.js"),View:s("./src/mobile.startup/View.js"),PageGateway:s("./src/mobile.startup/PageGateway.js"),Browser:s("./src/mobile.startup/Browser.js"),Button:s("./src/mobile.startup/Button.js"),Icon:s("./src/mobile.startup/Icon.js"),ReferencesDrawer:s("./src/mobile.startup/references/ReferencesDrawer.js"),ReferencesGateway:s("./src/mobile.startup/references/ReferencesGateway.js"),ReferencesHtmlScraperGateway:s("./src/mobile.startup/references/ReferencesHtmlScraperGateway.js"),ReferencesMobileViewGateway:s("./src/mobile.startup/references/ReferencesMobileViewGateway.js"),icons:s("./src/mobile.startup/icons.js"),Page:s("./src/mobile.startup/Page.js"),currentPage:s("./src/mobile.startup/currentPage.js"),PageHTMLParser:s("./src/mobile.startup/PageHTMLParser.js"),currentPageHTMLParser:s("./src/mobile.startup/currentPageHTMLParser.js"),Anchor:s("./src/mobile.startup/Anchor.js"),Skin:s("./src/mobile.startup/Skin.js"),OverlayManager:s("./src/mobile.startup/OverlayManager.js"),Overlay:s("./src/mobile.startup/Overlay.js"),loadingOverlay:s("./src/mobile.startup/loadingOverlay.js"),CtaDrawer:s("./src/mobile.startup/CtaDrawer.js"),toast:s("./src/mobile.startup/toast.js"),Watchstar:s("./src/mobile.startup/watchstar/Watchstar.js"),rlModuleLoader:s("./src/mobile.startup/rlModuleLoader.js"),eventBusSingleton:s("./src/mobile.startup/eventBusSingleton.js"),Toggler:s("./src/mobile.startup/Toggler.js"),toc:{TableOfContents:s("./src/mobile.startup/toc/TableOfContents.js")},notifications:{overlay:s("./src/mobile.startup/notifications/overlay.js")},search:{SearchOverlay:s("./src/mobile.startup/search/SearchOverlay.js"),MobileWebSearchLogger:s("./src/mobile.startup/search/MobileWebSearchLogger.js"),SearchGateway:s("./src/mobile.startup/search/SearchGateway.js")},lazyImages:{lazyImageLoader:s("./src/mobile.startup/lazyImages/lazyImageLoader.js")},talk:{overlay:s("./src/mobile.startup/talk/overlay.js")},languageOverlay:s("./src/mobile.startup/languageOverlay/languageOverlay.js"),mediaViewer:{overlay:s("./src/mobile.startup/mediaViewer/overlay.js")}},mw.mobileFrontend=r,r.define("mobile.startup",e.exports),n.subscribeMobileWebSearchSchema()},"./src/mobile.startup/notifications/overlay.js":function(e,t,s){var r=s("./src/mobile.startup/Overlay.js"),n=s("./src/mobile.startup/moduleLoaderSingleton.js"),a=s("./src/mobile.startup/promisedView.js"),i=s("./src/mobile.startup/View.js"),o=s("./src/mobile.startup/Anchor.js");e.exports=function(e,t){var s,c=mw.loader.using("mobile.notifications.overlay").then(function(){return s=new OO.ui.ButtonWidget({icon:"checkAll",title:mw.msg("echo-mark-all-as-read")}),i.make({class:"notifications-overlay-header-markAllRead"},[s.$element])}),l=a(c);return l.$el.hide(),r.make({heading:"<strong>"+mw.message("notifications").escaped()+"</strong>",footerAnchor:new o({href:mw.util.getUrl("Special:Notifications"),progressive:!0,additionalClassNames:"footer-link notifications-archive-link",label:mw.msg("echo-overlay-link")}).options,headerActions:[l],isBorderBox:!1,className:"overlay notifications-overlay navigation-drawer"},a(c.then(function(){return(0,n.require("mobile.notifications.overlay").list)(mw.echo,s,e,t)})))}},"./src/mobile.startup/references/ReferencesDrawer.js":function(e,t,s){var r=s("./src/mobile.startup/Drawer.js"),n=s("./src/mobile.startup/util.js"),a=s("./src/mobile.startup/icons.js"),i=s("./src/mobile.startup/mfExtend.js"),o=s("./src/mobile.startup/references/ReferencesGateway.js"),c=s("./src/mobile.startup/Icon.js");function l(e){r.call(this,n.extend({className:"drawer position-fixed text references-drawer",events:{"click sup a":"showNestedReference"}},e))}i(l,r,{defaults:n.extend({},r.prototype.defaults,{errorClassName:new c({name:"error",hasText:!0,isSmall:!0}).getClassName()}),show:function(){return r.prototype.show.apply(this,arguments)},template:n.template('\n<div class="references-drawer__header"></div>\n{{#error}}\n\t<div class="{{errorClassName}}">\n{{/error}}\n<sup>{{title}}</sup>\n{{#text}}\n\t{{{text}}}\n{{/text}}\n{{#error}}</div>{{/error}}\n\t'),closeOnScroll:!1,postRender:function(){var e=n.getWindow().height();r.prototype.postRender.apply(this),this.$el.find(".references-drawer__header").append([new c({isSmall:!0,name:"citation-invert",additionalClassNames:"references-drawer__title",hasText:!0,label:mw.msg("mobile-frontend-references-citation")}).$el,a.cancel("gray").$el]),this.options.text||this.$el.append(a.spinner().$el),e/2<400&&this.$el.css("max-height",e/2),this.on("show",this.onShow.bind(this)),this.on("hide",this.onHide.bind(this))},onShow:function(){n.getDocument().find("body").addClass("drawer-enabled")},onHide:function(){n.getDocument().find("body").removeClass("drawer-enabled")},showReference:function(e,t,s,r){var n=this,a=this.options.gateway;return this.options.page=t,this.options.pageHTMLParser=r,n.show(),a.getReference(e,t,r).then(function(e){n.render({title:s,text:e.text})},function(e){e===o.ERROR_NOT_EXIST?n.hide():n.render({error:!0,title:s,text:mw.msg("mobile-frontend-references-citation-error")})})},showNestedReference:function(e){var t=this.$el.find(e.target);return this.showReference(t.attr("href"),this.options.page,t.text(),this.options.pageHTMLParser),!1}}),e.exports=l},"./src/mobile.startup/search/MobileWebSearchLogger.js":function(e,t){function s(){this.userSessionToken=null,this.searchSessionToken=null}s.prototype={_newUserSession:function(){this.userSessionToken=mw.user.generateRandomSessionId()},_newSearchSession:function(){this.searchSessionToken=mw.user.generateRandomSessionId(),this.searchSessionCreatedAt=(new Date).getTime()},onSearchShow:function(){this._newUserSession()},onSearchStart:function(){this._newSearchSession(),mw.track("mf.schemaMobileWebSearch",{action:"session-start",userSessionToken:this.userSessionToken,searchSessionToken:this.searchSessionToken,timeOffsetSinceStart:0})},onSearchResults:function(e){var t=(new Date).getTime()-this.searchSessionCreatedAt;mw.track("mf.schemaMobileWebSearch",{action:"impression-results",resultSetType:"prefix",numberOfResults:e.results.length,userSessionToken:this.userSessionToken,searchSessionToken:this.searchSessionToken,timeToDisplayResults:t,timeOffsetSinceStart:t})},onSearchResultClick:function(e){var t=(new Date).getTime()-this.searchSessionCreatedAt;mw.track("mf.schemaMobileWebSearch",{action:"click-result",clickIndex:e.resultIndex+1,userSessionToken:this.userSessionToken,searchSessionToken:this.searchSessionToken,timeOffsetSinceStart:t})}},s.register=function(e){var t=new s;e.on("search-show",t.onSearchShow.bind(t)),e.on("search-start",t.onSearchStart.bind(t)),e.on("search-results",t.onSearchResults.bind(t)),e.on("search-result-click",t.onSearchResultClick.bind(t))},e.exports=s},"./src/mobile.startup/search/SearchOverlay.js":function(e,t,s){var r=s("./src/mobile.startup/mfExtend.js"),n=s("./src/mobile.startup/Overlay.js"),a=s("./src/mobile.startup/util.js"),i=s("./src/mobile.startup/headers.js").formHeader,o=s("./src/mobile.startup/Anchor.js"),c=s("./src/mobile.startup/Icon.js"),l=s("./src/mobile.startup/icons.js"),u=l.spinner().$el,h=s("./src/mobile.startup/watchstar/WatchstarPageList.js"),d=mw.config.get("wgCirrusSearchFeedbackLink");function p(e){var t=a.extend(!0,{isBorderBox:!1,className:"overlay search-overlay",headers:[i(a.template('<div class="overlay-title">\n<form method="get" action="{{action}}" class="search-box">\n\t<input class="search" type="search" name="search" autocomplete="off" placeholder="{{placeholderMsg}}" aria-label="{{placeholderMsg}}" value="{{searchTerm}}">\n</form>\n</div>\n\t\t\t\t\t').render({placeholderMsg:e.placeholderMsg,action:e.action||mw.config.get("wgScript")}),[l.cancel()],!1)],events:{"input input":"onInputInput","click .clear":"onClickClear","click .search-content":"onClickSearchContent","click .overlay-content":"onClickOverlayContent","click .overlay-content > div":"onClickOverlayContentDiv","touchstart .results":"hideKeyboardOnScroll","mousedown .results":"hideKeyboardOnScroll","click .results a":"onClickResult"}},e);n.call(this,t),this.api=t.api,this.gateway=new t.gatewayClass(this.api),this.router=t.router}r(p,n,{templatePartials:a.extend({},n.prototype.templatePartials,{content:a.template('\n<div class="search-content overlay-header">\n\t<ul>\n\t\t<li>{{! search content icon goes here }}</li>\n\t</ul>\n\t<div class="caption">\n\t\t<p class="with-results">{{searchContentLabel}}</p>\n\t\t<p class="without-results">{{noResultsMsg}}</p>\n\t\t<p class="without-results">{{{searchContentNoResultsMsg}}}</p>\n\t</div>\n</div>\n<div class="spinner-container position-fixed"></div>\n<div class="results">\n\t<div class="results-list-container"></div>\n\t{{#feedback}}\n\t\t<div class="search-feedback">\n\t\t\t{{prompt}}\n\t\t</div>\n\t{{/feedback}}\n</div>\n\t\t')}),defaults:a.extend({},n.prototype.defaults,{headerChrome:!0,clearIcon:new c({tagName:"button",name:"search-clear",isSmall:!0,label:mw.msg("mobile-frontend-clear-search"),additionalClassNames:"clear"}),searchContentIcon:new c({tagName:"a",href:"#",name:"search-content",label:mw.msg("mobile-frontend-search-content")}),searchContentLabel:mw.msg("mobile-frontend-search-content"),searchTerm:"",noResultsMsg:mw.msg("mobile-frontend-search-no-results"),searchContentNoResultsMsg:mw.message("mobile-frontend-search-content-no-results").parse(),feedback:!!d&&{feedback:new o({label:mw.msg("mobile-frontend-search-feedback-link-text"),href:d}),prompt:mw.msg("mobile-frontend-search-feedback-prompt")}}),onInputInput:function(){this.performSearch(),this.$clear.toggle(""!==this.$input.val())},onClickClear:function(){return this.$input.val("").trigger("focus"),this.performSearch(),this.$clear.hide(),!1},onClickSearchContent:function(){var e=a.getDocument().find("body"),t=this.$el.find("form");this.parseHTML("<input>").attr({type:"hidden",name:"fulltext",value:"search"}).appendTo(t),setTimeout(function(){t.appendTo(e),t.trigger("submit")},0)},onClickOverlayContent:function(){this.$el.find(".cancel").trigger("click")},onClickOverlayContentDiv:function(e){e.stopPropagation()},hideKeyboardOnScroll:function(){this.$input.trigger("blur")},onClickResult:function(e){var t=this.$el.find(e.currentTarget),s=t.closest("li");this.emit("search-result-click",{result:s,resultIndex:this.$results.index(s),originalEvent:e}),e.preventDefault(),this.router.back().then(function(){window.location.href=t.attr("href")})},postRender:function(){var e,t=this,s=this.options;function r(){t.$spinner.hide(),clearTimeout(e)}n.prototype.postRender.call(this),this.$el.find(".overlay-title").append(s.clearIcon.$el),this.$input=this.$el.find("input"),this.$clear=this.$el.find(".clear"),this.$searchContent=this.$el.find(".search-content").hide(),this.$searchFeedback=this.$el.find(".search-feedback").hide(),this.$resultContainer=this.$el.find(".results-list-container"),this.$searchContent.find("li").append(s.searchContentIcon.$el),this.$spinner=this.$el.find(".spinner-container"),this.$spinner.append(u),this.on("search-start",function(s){e&&r(),e=setTimeout(function(){t.$spinner.show()},2e3-s.delay)}),this.on("search-results",r),""===t.$input.val()&&this.$clear.hide(),s.feedback&&s.feedback.feedback&&this.$el.find(".search-feedback").append(s.feedback.feedback.$el)},showKeyboard:function(){var e=this.$input.val().length;this.$input.trigger("focus"),this.$input[0].setSelectionRange&&this.$input[0].setSelectionRange(e,e)},show:function(){n.prototype.show.apply(this,arguments),this.showKeyboard(),this.emit("search-show")},performSearch:function(){var e=this,t=this.api,s=this.$input.val(),r=this.gateway.isCached(s)?0:300;s!==this.lastQuery&&(e._pendingQuery&&e._pendingQuery.abort(),clearTimeout(this.timer),s.length?this.timer=setTimeout(function(){var n;e.emit("search-start",{query:s,delay:r}),n=e.gateway.search(s),e._pendingQuery=n.then(function(s){s&&s.query===e.$input.val()&&(e.$el.toggleClass("no-results",0===s.results.length),e.$searchContent.show().find("p").hide().filter(s.results.length?".with-results":".without-results").show(),new h({api:t,funnel:"search",pages:s.results,el:e.$resultContainer}),e.$results=e.$resultContainer.find("li"),e.emit("search-results",{results:s.results}))}).promise({abort:function(){n.abort()}})},r):e.resetSearch(),this.lastQuery=s)},resetSearch:function(){this.$spinner.hide(),this.$searchContent.hide(),this.$searchFeedback.hide(),this.$resultContainer.empty()}}),e.exports=p},"./src/mobile.startup/search/schemaMobileWebSearch.js":function(e,t,s){var r=s("./src/mobile.startup/context.js");e.exports={subscribeMobileWebSearchSchema:function(){mw.loader.using(["ext.eventLogging"]).then(function(){var e=new(0,mw.eventLog.Schema)("MobileWebSearch",mw.config.get("wgMFSchemaSearchSampleRate",.001),{platform:"mobileweb",platformVersion:r.getMode()});mw.trackSubscribe("mf.schemaMobileWebSearch",function(t,s){e.log(s)})})}}},"./src/mobile.startup/toc/TableOfContents.js":function(e,t,s){var r=s("./src/mobile.startup/View.js"),n=s("./src/mobile.startup/mfExtend.js"),a=s("./src/mobile.startup/util.js"),i=s("./src/mobile.startup/Icon.js");function o(e){r.call(this,a.extend({className:"toc-mobile",contentsMsg:mw.msg("toc")},e))}n(o,r,{templatePartials:{tocHeading:a.template('\n<li>\n\t<a href="#{{anchor}}">{{{line}}}</a>\n\t<ul>\n\t\t{{#subsections}}\n\t\t{{>tocHeading}}\n\t\t{{/subsections}}\n\t</ul>\n</li>\n\t\t')},template:a.template('\n<h2><span>{{contentsMsg}}</span></h2>\n<div>\n\t<ul>\n\t{{#sections}}\n\t{{>tocHeading}}\n\t{{/sections}}\n\t</ul>\n</div>\n<div style="clear:both;"></div>\n\t'),postRender:function(){new i({name:"toc",additionalClassNames:"toc-button"}).$el.prependTo(this.$el.find("h2"))}}),e.exports=o}},[["./src/mobile.startup/mobile.startup.js",0,1]]]);
//# sourceMappingURL=mobile.startup.js.map.json