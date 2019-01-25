this.mfModules=this.mfModules||{},this.mfModules["mobile.init"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"./src/mobile.init/BetaOptinPanel.js":function(e,t,i){var n=i("./src/mobile.startup/Button.js"),o=i("./src/mobile.startup/util.js"),r=i("./src/mobile.startup/mfExtend.js"),a=i("./src/mobile.startup/Panel.js"),s=mw.user;function l(e){a.call(this,o.extend({className:"panel panel-inline visible"},e))}r(l,a,{templatePartials:o.extend({},a.prototype.templatePartials,{button:n.prototype.template}),template:mw.template.get("mobile.init","Panel.hogan"),defaults:o.extend({},a.prototype.defaults,{postUrl:void 0,editToken:s.tokens.get("editToken"),text:mw.msg("mobile-frontend-panel-betaoptin-msg"),buttons:[new n({progressive:!0,additionalClassNames:"optin",label:mw.msg("mobile-frontend-panel-ok")}).options,new n({additionalClassNames:"cancel",label:mw.msg("mobile-frontend-panel-cancel")}).options]}),events:o.extend({},a.prototype.events,{"click .optin":"onOptin"}),onOptin:function(e){this.$(e.currentTarget).closest("form").submit()}}),e.exports=l},"./src/mobile.init/editor.js":function(e,t,i){var n=i("./src/mobile.startup/moduleLoaderSingleton.js"),o=mw.loader.require("mediawiki.router"),r=i("./src/mobile.startup/OverlayManager.js").getSingleton(),a=i("./src/mobile.startup/rlModuleLoader.js"),s=$("#ca-edit a, .mw-editsection a, .edit-link"),l=mw.user,c=i("./src/mobile.startup/toast.js"),m=i("./src/mobile.startup/CtaDrawer.js"),u=/MSIE \d\./.test(navigator.userAgent),d=mw.config.get("wgPageContentModel"),g=o.isSupported()&&!u,w=mw.config.get("wgVisualEditorConfig"),p=mw.config.get("wgUserEditCount"),f=w,b=/^\/editor\/(\d+|all)$/;function h(){var e=new mw.Uri(this.href).query.section||"all";return o.navigate("#/editor/"+e),!1}function v(e,t){var i,c,m,u=0===e.options.id;s.on("click",h),r.add(b,function(i){var o=$("#mw-content-text"),s=function(){var e=mw.storage.get("preferredEditor");return e||"SourceEditor"}(),c={overlayManager:r,api:new mw.Api,licenseMsg:t.getLicenseMsg(),title:e.title,isAnon:l.isAnon(),isNewPage:u,editCount:p,oldId:mw.util.getParamValue("oldid"),contentLang:o.attr("lang"),contentDir:o.attr("dir"),sessionId:l.generateRandomSessionId()},d=w&&w.namespaces||[],g=mw.util.getParamValue("redlink")?"new":"click";function b(e){mw.track("mf.schemaEditAttemptStep",{action:"init",type:"section",mechanism:g,editor_interface:e,editing_session_id:c.sessionId})}function h(){return b("wikitext"),mw.hook("mobileFrontend.editorOpening").fire(),a.loadModule("mobile.editor.overlay").then(function(){return new(n.require("mobile.editor.overlay/EditorOverlay"))(c)})}return"all"!==i&&(c.sectionId=e.isWikiText()?+i:null),f&&e.isWikiText()&&-1!==d.indexOf(mw.config.get("wgNamespaceNumber"))&&"translation"!==mw.config.get("wgTranslatePageTranslation")&&("VisualEditor"===s||"VisualEditor"===m)&&"SourceEditor"!==m?(b("visualeditor"),mw.hook("mobileFrontend.editorOpening").fire(),a.loadModule(["mobile.editor.ve"]).then(function(){return new(n.require("mobile.editor.overlay/VisualEditorOverlay"))(c)},h)):h()}),$("#ca-edit a").prop("href",function(e,t){var i=new mw.Uri(t);return i.query.section=0,i.toString()}),o.getPath()||!mw.util.getParamValue("veaction")&&"edit"!==mw.util.getParamValue("action")||("edit"===mw.util.getParamValue("veaction")?m="VisualEditor":"editsource"===mw.util.getParamValue("veaction")&&(m="SourceEditor"),c="#/editor/"+(mw.util.getParamValue("section")||"edit"===mw.util.getParamValue("action")&&"all"||"0"),window.history&&history.pushState?(delete(i=mw.Uri()).query.action,delete i.query.veaction,delete i.query.section,history.replaceState(null,document.title,i.toString()+c)):o.navigate(c))}function y(e,t){var i,n;!(i=mw.config.get("wgMinervaReadOnly"))&&mw.config.get("wgIsProbablyEditable")?v(e,t):(function(e){e.$(".mw-editsection").hide()}(e),n=mw.config.get("wgRestrictionEdit"),mw.user.isAnon()&&Array.isArray(n)&&-1!==n.indexOf("*")?function(){var e=new m({content:mw.msg("mobile-frontend-editor-disabled-anon"),signupQueryParams:{warning:"mobile-frontend-watchlist-signup-action"}});s.on("click",function(t){return e.show(),t.preventDefault(),e}),o.route(b,function(){e.show()}),o.checkRoute()}():k(i?mw.msg("apierror-readonly"):mw.msg("mobile-frontend-editor-disabled")))}function k(e){s.on("click",function(t){c.show(e),t.preventDefault()}),o.route(b,function(){c.show(e)}),o.checkRoute()}e.exports=function(e,t){var i=0===e.options.id;"wikitext"===d&&(mw.util.getParamValue("undo")||g&&(e.inNamespace("file")&&i?k(mw.msg("mobile-frontend-editor-uploadenable")):y(e,t)))}},"./src/mobile.init/mobile.init.js":function(e,t,i){var n,o,r=mw.storage,a=mw.config.get("skin"),s=mw.config.get("wgMFIsPageContentModelEditable"),l=i("./src/mobile.init/editor.js"),c=i("./src/mobile.startup/PageGateway.js"),m=i("./src/mobile.init/BetaOptinPanel.js"),u=new c(new mw.Api),d=mw.util,g=i("./src/mobile.startup/util.js"),w=g.getWindow(),p=g.getDocument(),f=mw.user,b=i("./src/mobile.startup/context.js"),h=i("./src/mobile.startup/Page.js"),v=mw.experiments,y=mw.config.get("wgMFExperiments")||{},k=i("./src/mobile.startup/Skin.js"),P=i("./src/mobile.startup/eventBusSingleton.js"),M=i("./src/mobile.startup/references/ReferencesMobileViewGateway.js"),S=E();function j(e,t){return function(){return[e.apply(this,arguments),t.apply(this,arguments)]}}function E(){return n||function(){var e=mw.config.get("wgRestrictionEdit",[]),t=$("#content #bodyContent");0===e.length&&e.push("*");return n=new h({el:t,title:mw.config.get("wgPageName").replace(/_/g," "),protection:{edit:e},revId:mw.config.get("wgRevisionId"),isMainPage:mw.config.get("wgIsMainPage"),isWatched:$("#ca-watch").hasClass("watched"),sections:u.getSectionsFromHTML(t),isMissing:0===mw.config.get("wgArticleId"),id:mw.config.get("wgArticleId"),namespaceNumber:mw.config.get("wgNamespaceNumber")})}()}function x(){var e=r.get("userFontSize","regular");p.addClass("mf-font-size-"+e)}o=new k({el:"body",page:S,referencesGateway:M.getSingleton(),eventBus:P}),w.on("resize",j($.debounce(100,function(){P.emit("resize")}),$.throttle(200,function(){P.emit("resize:throttled")}))).on("scroll",j($.debounce(100,function(){P.emit("scroll")}),$.throttle(200,function(){P.emit("scroll:throttled")}))),w.on("pageshow",function(){x()}),x(),y.betaoptin&&function(e,t){var i,n,o,a=r.get("mobile-betaoptin-token");!1===a||"~"===a||t.isMainPage()||t.inNamespace("special")||(a||(a=f.generateRandomSessionId(),r.set("mobile-betaoptin-token",a)),n="stable"===b.getMode(),o="A"===v.getBucket(e,a),n&&(o||d.getParamValue("debug"))&&(i=new m({postUrl:d.getUrl("Special:MobileOptions",{returnto:t.title})})).on("hide",function(){r.set("mobile-betaoptin-token","~")}).appendTo(t.getLeadSectionElement()),mw.track("mobile.betaoptin",{isPanelShown:void 0!==i}))}(y.betaoptin,E()),window.console&&window.console.log&&window.console.log.apply&&mw.config.get("wgMFEnableJSConsoleRecruitment")&&console.log(mw.msg("mobile-frontend-console-recruit")),!S.inNamespace("special")&&s&&"minerva"===a&&l(S,o),t={getCurrentPage:E},g.extend(mw.mobileFrontend,t),mw.mobileFrontend.define("mobile.init/skin",o),e.exports=t}},[["./src/mobile.init/mobile.init.js",0,1]]]);
//# sourceMappingURL=mobile.init.js.map.json