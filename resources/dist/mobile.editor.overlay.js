this.mfModules=this.mfModules||{},this.mfModules["mobile.editor.overlay"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"./src/mobile.editor.overlay/AbuseFilterOverlay.js":function(e,t,i){var o=i("./src/mobile.startup/Button.js"),n=i("./src/mobile.startup/util.js"),s=i("./src/mobile.startup/mfExtend.js"),a=i("./src/mobile.startup/Overlay.js");function r(e){a.call(this,n.extend({className:"overlay abusefilter-overlay"},e))}s(r,a,{defaults:n.extend({},a.prototype.defaults,{confirmButton:new o({additionalClassNames:"cancel",progressive:!0}).options}),templatePartials:n.extend({},a.prototype.templatePartials,{button:o.prototype.template,content:mw.template.get("mobile.editor.overlay","AbuseFilterOverlay.hogan")}),postRender:function(){a.prototype.postRender.apply(this),this.$("a").attr("target","_blank")}}),e.exports=r},"./src/mobile.editor.overlay/AbuseFilterPanel.js":function(e,t,i){var o=i("./src/mobile.startup/util.js"),n=i("./src/mobile.startup/View.js"),s=i("./src/mobile.startup/mfExtend.js"),a=i("./src/mobile.editor.overlay/AbuseFilterOverlay.js");function r(e){this.isDisallowed=!1,this.overlayManager=e.overlayManager,n.call(this,o.extend({className:"panel hidden"},e))}s(r,n,{defaults:{readMoreMsg:mw.msg("mobile-frontend-editor-abusefilter-read-more")},template:mw.template.get("mobile.editor.overlay","AbuseFilterPanel.hogan"),show:function(e,t){var i;this.overlayManager.add(/^\/abusefilter$/,function(){return new a({message:t})}),"warning"===e?i=mw.msg("mobile-frontend-editor-abusefilter-warning"):"disallow"===e&&(i=mw.msg("mobile-frontend-editor-abusefilter-disallow"),this.isDisallowed=!0),this.$(".message p").text(i),this.$el.removeClass("hidden")},hide:function(){this.$el.addClass("hidden")}}),e.exports=r},"./src/mobile.editor.overlay/BlockMessage.js":function(e,t,i){"use strict";var o=i("./src/mobile.startup/Drawer.js"),n=i("./src/mobile.startup/Button.js"),s=i("./src/mobile.startup/mfExtend.js"),a=i("./src/mobile.startup/Icon.js"),r=i("./src/mobile.startup/util.js");function l(){o.apply(this,arguments)}s(l,o,{defaults:r.extend({},o.prototype.defaults,{stopHandIcon:new a({name:"stop-hand"}).options,userIcon:new a({tagName:"span",name:"profile"}).options,okButton:new n({label:mw.msg("ok"),tagName:"button",progressive:!0,additionalClassNames:"cancel"}).options,createDetailsAnchorHref:function(){return mw.util.getUrl("Special:BlockList",{wpTarget:"#"+this.blockId})},createDetailsAnchorLabel:function(){return mw.msg("mobile-frontend-editor-blocked-drawer-help")},createTitle:function(){return this.partial?mw.msg("mobile-frontend-editor-blocked-drawer-title-partial"):mw.msg("mobile-frontend-editor-blocked-drawer-title")},reasonHeader:mw.msg("mobile-frontend-editor-blocked-drawer-reason-header"),creatorHeader:function(){return mw.msg("mobile-frontend-editor-blocked-drawer-creator-header",this.user.options.gender||"unknown")},expiryHeader:mw.msg("mobile-frontend-editor-blocked-drawer-expiry-header")}),templatePartials:r.extend({},o.prototype.templatePartials,{button:n.prototype.template,icon:a.prototype.template}),onShowDrawer:function(){var e=mw.config.get("wgDBname");o.prototype.onShowDrawer.apply(this),mw.config.get("wgEnableBlockNoticeStats")&&mw.track("counter.MediaWiki.BlockNotices."+e+".MobileFrontend.shown",1)},template:mw.template.get("mobile.editor.overlay","BlockMessage.hogan")}),e.exports=l},"./src/mobile.editor.overlay/EditorGateway.js":function(e,t,i){var o=i("./src/mobile.startup/util.js"),n=i("./src/mobile.editor.overlay/parseSaveError.js"),s=i("./src/mobile.startup/actionParams.js");function a(e){this.api=e.api,this.title=e.title,this.sectionId=e.sectionId,this.oldId=e.oldId,this.content=e.isNewPage?"":void 0,this.hasChanged=!1}a.prototype={getBlockInfo:function(e){var t;return e.actions&&e.actions.edit&&Array.isArray(e.actions.edit)&&(e.actions.edit.some(function(e){return-1!==["blocked","autoblocked"].indexOf(e.code)&&(t=e,!0)}),t&&t.data&&t.data.blockinfo)?(mw.loader.load("moment"),t.data.blockinfo):null},getContent:function(){var e,t=this;function i(){return o.Deferred().resolve({text:t.content||"",blockinfo:t.blockinfo,userinfo:t.userinfo})}return void 0!==this.content?i():(e=s({prop:["revisions","info"],meta:"userinfo",rvprop:["content","timestamp"],titles:t.title,intestactions:"edit",intestactionsdetail:"full",uiprop:"options"}),this.oldId&&(e.rvstartid=this.oldId),o.isNumeric(this.sectionId)&&(e.rvsection=this.sectionId),this.api.get(e).then(function(e){var n,s;return e.error?o.Deferred().reject(e.error.code):(void 0!==(s=e.query.pages[0]).missing?t.content="":(n=s.revisions[0],t.content=n.content,t.timestamp=n.timestamp),t.userinfo=e.query.userinfo,t.originalContent=t.content,t.blockinfo=t.getBlockInfo(s),i())}))},setContent:function(e){this.originalContent!==e?this.hasChanged=!0:this.hasChanged=!1,this.content=e},setPrependText:function(e){this.prependtext=e,this.hasChanged=!0},save:function(e){var t=this,i=o.Deferred();return e=e||{},function(){var s={action:"edit",title:t.title,summary:e.summary,captchaid:e.captchaId,captchaword:e.captchaWord,basetimestamp:t.timestamp,starttimestamp:t.timestamp};return void 0!==t.content?s.text=t.content:t.prependtext&&(s.prependtext=t.prependtext),o.isNumeric(t.sectionId)&&(s.section=t.sectionId),t.api.postWithToken("csrf",s).then(function(e){e&&e.edit&&"Success"===e.edit.result?(t.hasChanged=!1,i.resolve()):i.reject(n(e))},function(e,t){i.reject(n(t,e||"unknown"))}),i}()},abortPreview:function(){this._pending&&this._pending.abort()},getPreview:function(e){var t,i=o.Deferred(),n="",s=this;return o.extend(e,{action:"parse",sectionpreview:!0,pst:!0,mobileformat:!0,title:this.title,prop:["text","sections"]}),this.abortPreview(),t=this.api.post(e),this._pending=t.then(function(e){e&&e.parse&&e.parse.text?(0!==s.sectionId&&void 0!==e.parse.sections&&void 0!==e.parse.sections[0]&&void 0!==e.parse.sections[0].line&&(n=e.parse.sections[0].line),i.resolve({text:e.parse.text["*"],line:n})):i.reject()},function(){i.reject()}).promise({abort:function(){t.abort()}}),i}},e.exports=a},"./src/mobile.editor.overlay/EditorOverlay.js":function(e,t,i){var o=i("./src/mobile.editor.overlay/EditorOverlayBase.js"),n=i("./src/mobile.startup/util.js"),s=i("./src/mobile.startup/Section.js"),a=i("./src/mobile.editor.overlay/EditorGateway.js"),r=i("./src/mobile.editor.overlay/AbuseFilterPanel.js"),l=i("./src/mobile.startup/Button.js"),d=i("./src/mobile.startup/mfExtend.js"),c=i("./src/mobile.editor.overlay/BlockMessage.js"),h=i("./src/mobile.editor.overlay/VisualEditorOverlay.js"),m=i("./src/mobile.startup/MessageBox.js");function p(e){this.gateway=new a({api:e.api,title:e.title,sectionId:e.sectionId,oldId:e.oldId,isNewPage:e.isNewPage}),this.readOnly=!!e.oldId,this.isVisualEditorEnabled()&&(e.editSwitcher=!0),this.readOnly?(e.readOnly=!0,e.editingMsg=mw.msg("mobile-frontend-editor-viewing-source-page",e.title)):e.editingMsg=mw.msg("mobile-frontend-editor-editing-page",e.title),e.isAnon&&(e=this._prepareAnonWarning(e)),e.isVisualEditor=!1,e.previewingMsg=mw.msg("mobile-frontend-editor-previewing-page",e.title),o.call(this,n.extend({events:{"input .wikitext-editor":"onInputWikitextEditor"}},e))}d(p,o,{templatePartials:n.extend({},o.prototype.templatePartials,{content:mw.template.get("mobile.editor.overlay","content.hogan"),messageBox:m.prototype.template,anonWarning:mw.template.get("mobile.editor.overlay","EditorOverlayAnonWarning.hogan")}),defaults:n.extend({},o.prototype.defaults,{loginButton:new l({block:!0,label:mw.msg("mobile-frontend-watchlist-cta-button-login")}).options,signupButton:new l({block:!0,label:mw.msg("mobile-frontend-watchlist-cta-button-signup")}).options,anonButton:new l({label:mw.msg("mobile-frontend-editor-anon"),block:!0,additionalClassNames:"continue anonymous",progressive:!0}).options,warningOptions:{className:"warningbox anon-msg",msg:mw.msg("mobile-frontend-editor-anonwarning")}}),editor:"wikitext",sectionLine:"",isVisualEditorEnabled:function(){var e=mw.config.get("wgVisualEditorConfig")&&mw.config.get("wgVisualEditorConfig").namespaces;return e&&e.indexOf(mw.config.get("wgNamespaceNumber"))>-1&&"translation"!==mw.config.get("wgTranslatePageTranslation")&&"wikitext"===mw.config.get("wgPageContentModel")},onInputWikitextEditor:function(){this.gateway.setContent(this.$(".wikitext-editor").val()),this.$(".continue, .submit").prop("disabled",!1)},onClickContinue:function(e){if(this.options.isAnon&&this.$(e.target).hasClass("anonymous"))return this._showEditorAfterWarning(),!1;o.prototype.onClickContinue.apply(this,arguments)},onClickBack:function(){o.prototype.onClickBack.apply(this,arguments),this._hidePreview()},postRender:function(){var e=this;this.isVisualEditorEnabled()&&mw.loader.using("ext.visualEditor.switching").then(function(){var t,i=new OO.ui.ToolFactory,o=new OO.ui.ToolGroupFactory;i.register(mw.libs.ve.MWEditModeVisualTool),i.register(mw.libs.ve.MWEditModeSourceTool),(t=new OO.ui.Toolbar(i,o,{classes:["editor-switcher"]})).on("switchEditor",function(t){"visual"===t&&(e.gateway.hasChanged?window.confirm(mw.msg("mobile-frontend-editor-switch-confirm"))&&e.onStageChanges():e._switchToVisualEditor(e.options))}),t.setup([{name:"editMode",type:"list",icon:"edit",title:mw.msg("visualeditor-mweditmode-tooltip"),include:["editModeVisual","editModeSource"]}]),e.$el.find(".switcher-container").html(t.$element),t.emit("updateState")}),o.prototype.postRender.apply(this),this.$preview=this.$(".preview"),this.$content=this.$(".wikitext-editor"),this.$content.addClass("mw-editfont-"+mw.user.options.get("editfont")),e.options.isAnon&&(this.$anonWarning=this.$(".anonwarning"),this.$content.hide(),this.$anonHiddenButtons=this.$(".overlay-header .continue, .editor-switcher").hide(),this.hideSpinner()),this.$(".license a").attr("target","_blank"),this.abuseFilterPanel=new r({overlayManager:this.overlayManager}).appendTo(this.$(".panels")),this.readOnly&&this.$content.prop("readonly",!0),this.$content.on("input",this._resizeEditor.bind(this)),e.options.isAnon||this._loadContent()},_prepareAnonWarning:function(e){var t=n.extend({returnto:e.returnTo||mw.config.get("wgPageName"),returntoquery:"action=edit&section="+e.sectionId,warning:"mobile-frontend-edit-login-action"},e.queryParams),i=n.extend({type:"signup",warning:"mobile-frontend-edit-signup-action"},e.signupQueryParams);return e.loginButton=n.extend({href:mw.util.getUrl("Special:UserLogin",t)},this.defaults.loginButton),e.signupButton=n.extend({href:mw.util.getUrl("Special:UserLogin",n.extend(t,i))},this.defaults.signupButton),e},_showEditorAfterWarning:function(){this.showSpinner(),this.$anonWarning.hide(),this.$anonHiddenButtons.show(),this._loadContent()},onStageChanges:function(){var e=this,t={text:this.getContent()};function i(){e.hideSpinner(),e.$preview.show()}this.scrollTop=n.getDocument().find("body").scrollTop(),this.$content.hide(),this.showSpinner(),mw.config.get("wgIsMainPage")&&(t.mainpage=1),this.gateway.getPreview(t).then(function(t){var o=t.text,n=t.line;e.sectionLine=e.parseHTML("<div>").html(n).text(),new s({el:e.$preview,text:o}).$("a").on("click",!1),i()},function(){e.$preview.addClass("error").text(mw.msg("mobile-frontend-editor-error-preview")),i()}),o.prototype.onStageChanges.apply(this,arguments)},_hidePreview:function(){this.gateway.abortPreview(),this.hideSpinner(),this.$preview.removeClass("error").hide(),this.$content.show(),window.scrollTo(0,this.scrollTop),this.showHidden(".initial-header"),this.abuseFilterPanel.hide()},_resizeEditor:function(){var e,t,i;this.$scrollContainer?i=this.$scrollContainer:(t=OO.ui.Element.static.getClosestScrollableContainer(this.$content[0]),i=this.$(t).length?this.$(t):n.getDocument(),this.$scrollContainer=i,this.$content.css("padding-bottom",.6*this.$scrollContainer.height())),this.$content.prop("scrollHeight")&&i.length&&(e=i.scrollTop(),this.$content.css("height","auto").css("height",this.$content.prop("scrollHeight")+2+"px"),i.scrollTop(e))},setContent:function(e){this.$content.show().val(e),this._resizeEditor()},getContent:function(){return this.$content.val()},_parseBlockInfo:function(e){var t,i,o,n=window.moment;return t={partial:e.blockinfo.blockpartial||!1,user:e.userinfo,creator:{name:e.blockinfo.blockedby,url:mw.util.getUrl(mw.config.get("wgFormattedNamespaces")[2]+":"+e.blockinfo.blockedby)},expiry:null,duration:null,reason:"",blockId:e.blockinfo.blockid},i=e.blockinfo.blockexpiry,-1===["infinite","indefinite","infinity","never"].indexOf(i)&&(t.expiry=n(i).format("LLL"),t.duration=n().to(i,!0)),o=e.blockinfo.blockreason,t.reason=o?function(e){var t,i;t=new mw.jqueryMsg.parser;try{return i=t.wikiTextToAst(e),t.emitter.emit(i).html()}catch(e){return!1}}(o)||mw.html.escape(o):mw.message("mobile-frontend-editor-generic-block-reason").escaped(),t},_loadContent:function(){var e=this,t=this.$el;this.$content.hide(),this.showSpinner(),t.addClass("overlay-loading"),this.gateway.getContent().then(function(i){var o,n=i.text;e.setContent(n),i.blockinfo?mw.loader.using("moment").then(function(){o=e._parseBlockInfo(i),new c(o).toggle(),e.hide(),e.hideSpinner(),t.removeClass("overlay-loading")}):(e.hideSpinner(),t.removeClass("overlay-loading"))},function(){e.reportError(mw.msg("mobile-frontend-editor-error-loading")),t.removeClass("overlay-loading")})},_switchToVisualEditor:function(e){var t=this;this.log({action:"abort",type:"switchnochange",mechanism:"navigate"}),mw.storage.set("preferredEditor","VisualEditor"),this.showSpinner(),this.$content.hide(),mw.loader.using("ext.visualEditor.targetLoader").then(function(){return mw.libs.ve.targetLoader.addPlugin("mobile.editor.ve"),mw.libs.ve.targetLoader.loadModules("visual")}).then(function(){e.EditorOverlay=p,t.hideSpinner(),delete e.className,t.switching=!0,t.overlayManager.replaceCurrent(new h(e)),t.switching=!1},function(){t.hideSpinner(),t.$content.show()})},_showAbuseFilter:function(e,t){this.abuseFilterPanel.show(e,t),this.showHidden(".save-header"),this.$(".continue, .submit").prop("disabled",this.abuseFilterPanel.isDisallowed)},onSaveBegin:function(){var e=this,t={summary:this.$(".summary").val()};""!==e.sectionLine&&(t.summary="/* "+e.sectionLine+" */"+t.summary),o.prototype.onSaveBegin.apply(this,arguments),this.confirmAborted||(this.captchaId&&(t.captchaId=this.captchaId,t.captchaWord=this.$(".captcha-word").val()),this.showHidden(".saving-header"),this.gateway.save(t).then(function(){var t=e.options.title;mw.config.get("wgIsMainPage")?window.location=mw.util.getUrl(t):e.onSaveComplete()},function(t){e.onSaveFailure(t)}))},onSaveFailure:function(e){var t,i;"captcha"===e.type?(this.captchaId=e.details.id,this.handleCaptcha(e.details)):"abusefilter"===e.type?this._showAbuseFilter(e.details.type,e.details.message):(i=this.saveFailureMessage(e),"readonly"===e.type&&(t=mw.msg("apierror-readonly")),(i||t)&&(this.reportError(i,t),this.showHidden(".save-header, .save-panel"))),o.prototype.onSaveFailure.apply(this,arguments)},hasChanged:function(){return this.gateway.hasChanged}}),e.exports=p},"./src/mobile.editor.overlay/EditorOverlayBase.js":function(e,t,i){var o=i("./src/mobile.startup/Overlay.js"),n=i("./src/mobile.startup/util.js"),s=i("./src/mobile.startup/PageGateway.js"),a=i("./src/mobile.startup/Icon.js"),r=i("./src/mobile.startup/toast.js"),l=i("./src/mobile.startup/mfExtend.js"),d=i("./src/mobile.startup/MessageBox.js"),c=mw.user;function h(e,t){(t=t||{}).classes=["visual-editor"],h.super.call(this,e,t)}function m(e){var t=this,i=n.extend({className:"overlay editor-overlay",isBorderBox:!1},e,{events:n.extend({"click .back":"onClickBack","click .continue":"onClickContinue","click .submit":"onClickSubmit"},e.events)});i.isNewPage&&(i.placeholder=mw.msg("mobile-frontend-editor-placeholder-new-page",c)),0!==mw.config.get("wgNamespaceNumber")&&(i.summaryRequestMsg=mw.msg("mobile-frontend-editor-summary")),this.pageGateway=new s(i.api),this.editCount=i.editCount,this.isNewPage=i.isNewPage,this.isNewEditor=0===i.editCount,this.sectionId=i.sectionId,this.config=mw.config.get("wgMFEditorOptions"),this.sessionId=i.sessionId,this.overlayManager=i.overlayManager,this.allowCloseWindow=mw.confirmCloseWindow({test:function(){return t.hasChanged()},message:mw.msg("mobile-frontend-editor-cancel-confirm"),namespace:"editwarning"}),o.call(this,i)}OO.inheritClass(h,OO.ui.Tool),h.static.name="editVe",h.static.icon="edit",h.static.group="editorSwitcher",h.static.title=mw.msg("mobile-frontend-editor-switch-visual-editor"),h.prototype.onSelect=function(){},h.prototype.onUpdateState=function(){},l(m,o,{defaults:n.extend({},o.prototype.defaults,{hasToolbar:!1,continueMsg:mw.msg("mobile-frontend-editor-continue"),cancelMsg:mw.msg("mobile-frontend-editor-cancel"),closeMsg:mw.msg("mobile-frontend-editor-keep-editing"),summaryRequestMsg:mw.msg("mobile-frontend-editor-summary-request"),summaryMsg:mw.msg("mobile-frontend-editor-summary-placeholder"),placeholder:mw.msg("mobile-frontend-editor-placeholder"),waitMsg:mw.msg("mobile-frontend-editor-wait"),waitIcon:new a({name:"spinner",additionalClassNames:"savespinner loading"}).toHtmlString(),captchaMsg:mw.msg("mobile-frontend-account-create-captcha-placeholder"),captchaTryAgainMsg:mw.msg("mobile-frontend-editor-captcha-try-again"),switchMsg:mw.msg("mobile-frontend-editor-switch-editor"),confirmMsg:mw.msg("mobile-frontend-editor-cancel-confirm"),licenseMsg:void 0}),templatePartials:n.extend({},o.prototype.templatePartials,{editHeader:mw.template.get("mobile.editor.overlay","editHeader.hogan"),previewHeader:mw.template.get("mobile.editor.overlay","previewHeader.hogan"),saveHeader:mw.template.get("mobile.editor.overlay","saveHeader.hogan")}),template:mw.template.get("mobile.editor.overlay","EditorOverlayBase.hogan"),log:function(e){mw.track("mf.schemaEditAttemptStep",n.extend(e,{editor_interface:this.editor,editing_session_id:this.sessionId}))},confirmSave:function(){return!(this.isNewPage&&!window.confirm(mw.msg("mobile-frontend-editor-new-page-confirm",c)))},onSaveComplete:function(){var e,t=n.getWindow(),i=this.options.title;this.saved=!0,this.pageGateway.invalidatePage(i),e=this.isNewPage?mw.msg("mobile-frontend-editor-success-new-page"):this.isNewEditor?mw.msg("mobile-frontend-editor-success-landmark-1"):mw.msg("mobile-frontend-editor-success"),r.showOnPageReload(e,"success"),this.log({action:"saveSuccess"}),this.sectionLine?window.location.hash=this.sectionLine:window.location.hash="#",t.off("beforeunload.mfeditorwarning"),window.location.reload()},onSaveFailure:function(e){var t=e&&e.details&&e.details.code;"captcha"===e.type&&(t="captcha"),this.log({action:"saveFailure",message:this.saveFailureMessage(e),type:{editconflict:"editConflict",wasdeleted:"editPageDeleted","abusefilter-disallowed":"extensionAbuseFilter",captcha:"extensionCaptcha",spamprotectiontext:"extensionSpamBlacklist","titleblacklist-forbidden-edit":"extensionTitleBlacklist"}[t]||"responseUnknown"})},saveFailureMessage:function(e){var t=e&&e.details&&e.details.code;return"readonly"===e.type?e.details.readonlyreason:"editconflict"===t?mw.msg("mobile-frontend-editor-error-conflict"):["blocked","autoblocked"].indexOf(t)>-1?e.error.info:mw.msg("mobile-frontend-editor-error")},reportError:function(e,t){var i=new d({className:"errorbox",msg:e,heading:t});this.$errorNoticeContainer.html(i.$el)},hideErrorNotice:function(){this.$errorNoticeContainer.empty()},onStageChanges:function(){this.showHidden(".save-header, .save-panel"),this.log({action:"saveIntent"}),window.scrollTo(0,1)},onSaveBegin:function(){this.confirmAborted=!1,this.hideErrorNotice(),this.confirmSave()?this.log({action:"saveAttempt"}):this.confirmAborted=!0},postRender:function(){this.log({action:"ready"}),this.log({action:"loaded"}),this.config.skipPreview?(this.nextStep="onSaveBegin",this.$(".continue").text(this.defaults.saveMsg)):this.nextStep="onStageChanges",this.$errorNoticeContainer=this.$el.find("#error-notice-container"),o.prototype.postRender.apply(this),this.showHidden(".initial-header")},show:function(){this.saved=!1,o.prototype.show.call(this),mw.hook("mobileFrontend.editorOpened").fire(this.editor)},onClickBack:function(){},onClickSubmit:function(){this.onSaveBegin()},onClickContinue:function(){this[this.nextStep]()},hide:function(){var e,t=this;return this.hasChanged()?((e=OO.ui.getWindowManager()).addWindows([new mw.widgets.AbandonEditDialog]),e.openWindow("abandonedit").closed.then(function(e){e&&"discard"===e.action&&(t.log({action:"abort",mechanism:"cancel",type:"abandon"}),t.allowCloseWindow.release(),mw.hook("mobileFrontend.editorClosed").fire(),o.prototype.hide.call(t))})):(this.switching||this.saved||this.log({action:"abort",mechanism:"cancel",type:this.target&&this.target.edited?"abandon":"nochange"}),this.allowCloseWindow.release(),mw.hook("mobileFrontend.editorClosed").fire(),o.prototype.hide.call(t))},shouldConfirmLeave:function(e){return!(e||!this.hasChanged())},hasChanged:function(){},handleCaptcha:function(e){var t=this,i=this.$(".captcha-word");this.captchaShown&&(i.val(""),i.attr("placeholder",this.options.captchaTryAgainMsg),setTimeout(function(){i.attr("placeholder",t.options.captchaMsg)},2e3)),0===e.mime.indexOf("image/")?(this.$(".captcha-panel#question").detach(),this.$(".captcha-panel img").attr("src",e.url)):(this.$(".captcha-panel #image").detach(),0===e.mime.indexOf("text/html")?this.$(".captcha-panel #question").html(e.question):this.$(".captcha-panel #question").text(e.question)),this.showHidden(".save-header, .captcha-panel"),this.captchaShown=!0}}),e.exports=m},"./src/mobile.editor.overlay/VisualEditorOverlay.js":function(e,t,i){var o=i("./src/mobile.editor.overlay/EditorOverlayBase.js"),n=i("./src/mobile.editor.overlay/EditorGateway.js"),s=i("./src/mobile.startup/mfExtend.js"),a=i("./src/mobile.startup/util.js");function r(e){this.applyHeaderOptions(e,!0),o.call(this,a.extend({isBorderBox:!1,className:"overlay editor-overlay editor-overlay-ve"},e)),this.EditorOverlay=e.EditorOverlay,this.isNewPage=e.isNewPage,this.gateway=new n({api:e.api,title:e.title,sectionId:e.sectionId,oldId:e.oldId,isNewPage:e.isNewPage})}s(r,o,{templatePartials:a.extend({},o.prototype.templatePartials,{editHeader:mw.template.get("mobile.editor.overlay","toolbarVE.hogan"),content:mw.template.get("mobile.editor.overlay","contentVE.hogan")}),editor:"visualeditor",applyHeaderOptions:function(e,t){e.hasToolbar=t,e.isVisualEditor=t},destroyTarget:function(){this.target&&(this.target.destroy(),this.target=null)},show:function(){o.prototype.show.apply(this,arguments),this.target=ve.init.mw.targetFactory.create("article",this,{$element:this.$el,section:this.options.sectionId||null}),this.target.load(this.options.dataPromise)},hide:function(){var e=this,t=o.prototype.hide.apply(this,arguments);return!0===t?this.destroyTarget():t&&t.then&&t.then(function(t){t&&e.destroyTarget()}),t},onClickBack:function(){o.prototype.onClickBack.apply(this,arguments),this.switchToEditor()},switchToEditor:function(){this.showHidden(".initial-header")},switchToSourceEditor:function(){var e=this.EditorOverlay;this.log({action:"abort",type:"switchnochange",mechanism:"navigate"}),mw.storage.set("preferredEditor","SourceEditor"),this.showSpinner(),this.$(".surface").hide(),this.hideSpinner(),this.applyHeaderOptions(this.options,!1),delete this.options.className,this.switching=!0,this.overlayManager.replaceCurrent(new e(this.options)),this.switching=!1},onSaveComplete:function(){o.prototype.onSaveComplete.apply(this,arguments),this.destroyTarget()},hasChanged:function(){return this.target&&this.target.getSurface()&&this.target.getSurface().getModel().hasBeenModified()&&!this.saved}}),e.exports=r},"./src/mobile.editor.overlay/mobile.editor.overlay.js":function(e,t,i){var o=i("./src/mobile.startup/moduleLoaderSingleton.js"),n=i("./src/mobile.editor.overlay/EditorOverlay.js"),s=i("./src/mobile.editor.overlay/VisualEditorOverlay.js"),a=i("./src/mobile.editor.overlay/schemaEditAttemptStep.js");o.define("mobile.editor.overlay/EditorOverlay",n),o.define("mobile.editor.overlay/VisualEditorOverlay",s),a()},"./src/mobile.editor.overlay/schemaEditAttemptStep.js":function(e,t){e.exports=function(){var e=!!mw.util.getParamValue("trackdebug");(null!==mw.loader.getState("schema.EditAttemptStep")||e)&&mw.loader.using(["ext.eventLogging.subscriber"]).then(function(){var t=mw.eventLog.Schema,i=mw.user,o=mw.config.get("wgWMESchemaEditAttemptStepSamplingRate"),n={saveIntent:"save_intent",saveAttempt:"save_attempt",saveSuccess:"save_success",saveFailure:"save_failure"},s={},a=new t("EditAttemptStep",o,{page_id:mw.config.get("wgArticleId"),revision_id:mw.config.get("wgRevisionId"),page_title:mw.config.get("wgPageName"),page_ns:mw.config.get("wgNamespaceNumber"),user_id:i.getId(),user_class:i.isAnon()?"IP":void 0,user_editcount:mw.config.get("wgUserEditCount",0),mw_version:mw.config.get("wgVersion"),platform:"phone",integration:"page",page_token:i.getPageviewToken(),session_token:i.sessionId(),version:1});mw.trackSubscribe("mf.schemaEditAttemptStep",function(t,i,r){var l=n[i.action]||i.action,d=0;r=r||this.timeStamp,i[l+"_type"]=i.type,i[l+"_mechanism"]=i.mechanism,"init"!==i.action&&(d=Math.round(function(e,t,i){if(void 0!==t.timing)return t.timing;switch(e){case"ready":case"loaded":return i-s.init;case"saveIntent":return i-s.ready;case"saveAttempt":return i-s.saveIntent;case"saveSuccess":case"saveFailure":return mw.log.warn("mf.schemaEditAttemptStep: Do not rely on default timing value for saveSuccess/saveFailure"),-1;case"abort":switch(t.abort_type){case"preinit":return i-s.init;case"nochange":case"switchwith":case"switchwithout":case"switchnochange":case"abandon":return i-s.ready;case"abandonMidsave":return i-s.saveAttempt}return mw.log.warn("mf.schemaEditAttemptStep: Unrecognized abort type",t.type),-1}return mw.log.warn("mf.schemaEditAttemptStep: Unrecognized action",e),-1}(i.action,i,r)),i[l+"_timing"]=d),delete i.type,delete i.mechanism,i[l+"_message"]=i.message,delete i.message,i.is_oversample=!mw.eventLog.inSample(1/o),"abort"===i.action&&"switchnochange"!==i.abort_type?s={}:s[i.action]=r,"switchnochange"!==i.abort_type&&(s.abort&&"ready"===i.action?delete s.abort:e?function(){console.log.apply(console,arguments)}(t+"."+i.action,d+"ms",i):a.log(i,mw.config.get("wgWMESchemaEditAttemptStepOversample")?1:o))})})}}},[["./src/mobile.editor.overlay/mobile.editor.overlay.js",0,1]]]);
//# sourceMappingURL=mobile.editor.overlay.js.map.json