"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[568],{9568:(U,p,e)=>{e.r(p),e.d(p,{TranslatesModule:()=>J});var u=e(6512),g=e(6814),i=e(95),t=e(9467),d=e(6311),f=e(3375),x=e(2537),m=e(9185),h=e(2515),_=e(2812),C=e(5660),b=e(3475);let v=(()=>{class n{constructor(a){this._tr=a}transform(a){return this._tr.translate(a)}static#t=this.\u0275fac=function(r){return new(r||n)(t.Y36(d.s,16))};static#n=this.\u0275pipe=t.Yjl({name:"translate",type:n,pure:!0})}return n})();function M(n,l){if(1&n&&(t.TgZ(0,"option",16),t._uU(1),t.qZA()),2&n){const a=l.$implicit;t.Q6J("value",a.code),t.xp6(1),t.hij(" ",a.name," ")}}function T(n,l){if(1&n&&(t.TgZ(0,"option",16),t._uU(1),t.qZA()),2&n){const a=l.$implicit;t.Q6J("value",a),t.xp6(1),t.hij(" ",a," ")}}function w(n,l){1&n&&(t._uU(0),t.ALo(1,"translate")),2&n&&t.hij(" ",t.lcZ(1,1,l.$implicit.slug)," ")}let y=(()=>{class n{constructor(a,r,o,c){this.ts=a,this._alert=r,this._form=o,this._http=c,this.columns=["word","translation"],this.form=this._form.getForm("translate",{formId:"translate",title:"Translate",components:[{name:"Text",key:"translate",focused:!0,fields:[{name:"Placeholder",value:"fill Translate"},{name:"Label",value:"Translate"}]}]}),this.config={buttons:[{icon:"translate",click:s=>{console.log(s)}}],update:s=>{this._form.modal(this.form,[],s).then(A=>{this._http.post("/api/translate/create",{slug:s.slug,lang:this.lang,translate:A.translate})})}},this.page="",this.lang=this.ts.language?this.ts.language.code:"en"}static#t=this.\u0275fac=function(r){return new(r||n)(t.Y36(d.s),t.Y36(f.c),t.Y36(x.o),t.Y36(m.OE))};static#n=this.\u0275cmp=t.Xpm({type:n,selectors:[["ng-component"]],decls:29,vars:8,consts:[[1,"container-fluid"],[1,"page-wrapper"],[1,"translate__top-inner"],[1,"translate__inner"],["for","",1,"formboxs"],["translate","",1,"formboxs_title"],["placeholder","Translate",1,"translate__select",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["translate","",3,"value"],[1,"translate__buttons"],[1,"translate__dawn-jcon"],[1,"material-icons","ng-tns-c405976996-4"],["translate",""],[1,"translate__dawn-jcon",3,"click"],[3,"columns","config","rows"],["cell","translation"],[3,"value"]],template:function(r,o){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"label",4)(5,"div",5),t._uU(6," Common.Select language "),t.qZA(),t.TgZ(7,"select",6),t.NdJ("ngModelChange",function(s){return o.lang=s})("ngModelChange",function(){return o.ts.prepare_words(o.lang)}),t.YNc(8,M,2,2,"option",7),t.qZA()(),t.TgZ(9,"label",4)(10,"div",5),t._uU(11," Common.Select page "),t.qZA(),t.TgZ(12,"select",6),t.NdJ("ngModelChange",function(s){return o.page=s}),t.TgZ(13,"option",8),t._uU(14,"Common.All"),t.qZA(),t.YNc(15,T,2,2,"option",7),t.qZA()()(),t.TgZ(16,"div",9)(17,"wbutton",10)(18,"span",11),t._uU(19," translate "),t.qZA(),t.TgZ(20,"span",12),t._uU(21,"Common.Translate all"),t.qZA()(),t.TgZ(22,"wbutton",13),t.NdJ("click",function(){return o.ts.download_json()}),t.TgZ(23,"span",11),t._uU(24," download "),t.qZA(),t.TgZ(25,"span",12),t._uU(26,"Common.Download JSON"),t.qZA()()()(),t.TgZ(27,"wtable",14),t.YNc(28,w,2,3,"ng-template",15),t.qZA()()()),2&r&&(t.xp6(7),t.Q6J("ngModel",o.lang),t.xp6(1),t.Q6J("ngForOf",o.ts.languages),t.xp6(4),t.Q6J("ngModel",o.page),t.xp6(1),t.Q6J("value",""),t.xp6(2),t.Q6J("ngForOf",o.ts.pages),t.xp6(12),t.Q6J("columns",o.columns)("config",o.config)("rows",o.ts.words))},dependencies:[h.P,g.sg,_.r,i.YN,i.Kr,i.EJ,i.JJ,i.On,C.a,b.Y0,v],styles:['html.dark[_ngcontent-%COMP%]:root{--c-basic: #333;--c-bg-primary: #282828;--c-bg-secondary: #343434;--c-bg-tertiary: #404040;--c-border: #404040;--c-shadow: #444444;--c-text-primary: #ffffff;--c-text-secondary: #ffffff;--c-placeholder: #7a7a7a}.translate__top-inner[_ngcontent-%COMP%]{width:100%;max-width:100vw;display:flex;background:var(--c-bg-secondary);padding:15px;align-items:center;flex-wrap:wrap;gap:40px;justify-content:space-between;border-radius:10px;margin:0 auto;position:relative}@media (max-width: 767px){.translate__top-inner[_ngcontent-%COMP%]{flex-direction:column;align-items:center;padding:15px}}.translate__top-inner[_ngcontent-%COMP%]:before{content:"";position:absolute;height:100px;width:100%;background-color:var(--c-bg-secondary);z-index:-1;left:0;right:0;bottom:-50px}.translate__btn[_ngcontent-%COMP%]{position:absolute;top:-5px;right:25px;font-size:23px}.translate__dawn-jcon[_ngcontent-%COMP%]   span.material-icons[_ngcontent-%COMP%]{padding-right:5px}.translate__buttons[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;gap:10px}@media (max-width: 575px){.translate__buttons[_ngcontent-%COMP%]{flex-direction:column}.translate__buttons[_ngcontent-%COMP%]   wbutton[_ngcontent-%COMP%]{width:100%}}.translate__inner[_ngcontent-%COMP%]{display:flex;gap:40px;flex-wrap:wrap}@media (max-width: 575px){.translate__inner[_ngcontent-%COMP%]{flex-direction:column;align-items:center}}.formboxs_label[_ngcontent-%COMP%]{width:100%;color:var(--c-text-primary);position:relative;display:flex;justify-content:space-between;padding-bottom:10px;padding-right:52px}.translate__main-wrap[_ngcontent-%COMP%]{justify-content:center}.translate__select[_ngcontent-%COMP%]{min-width:200px;max-width:200px;background:#e7e7e7;padding:5px;border:1px solid #7f8c8d;border-radius:5px}.translate__main-inner[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;flex-direction:column;width:100%;max-width:350px;border-radius:10px;margin:5px 15px 35px;padding:10px;height:-moz-fit-content;height:fit-content;background:var(--c-bg-secondary);border:2px solid #256eff;cursor:pointer}@media (max-width: 575px){.translate__main-inner[_ngcontent-%COMP%]{margin:0}}.title[_ngcontent-%COMP%]{text-align:center}.input[_ngcontent-%COMP%]{width:100%;margin-right:10px;border-radius:5px;padding:5px 10px;border:1px solid var(--c-text-primary)}.formboxs[_ngcontent-%COMP%]{display:flex;gap:10px;flex-direction:column;align-items:flex-start;max-width:200px}.formboxs_title[_ngcontent-%COMP%]{color:var(--c-text-primary);display:flex;justify-content:center;align-items:center}.main__sub-inner[_ngcontent-%COMP%]{margin:20px;display:flex;flex-wrap:wrap}@media (max-width: 767px){.main__sub-inner[_ngcontent-%COMP%]{margin:20px 0}}@media (max-width: 575px){.main__sub-inner[_ngcontent-%COMP%]{gap:20px}}.img-close[_ngcontent-%COMP%]{width:25px;height:25px;border-radius:50%;position:absolute;top:-6px;right:-6px;z-index:2;transition:all .3s;cursor:pointer}.img-close[_ngcontent-%COMP%]:before{content:"";position:absolute;left:50%;top:50%;width:80%;height:2px;transform:translate(-50%,-50%) rotate(45deg);background:var(--c-text-primary)}.img-close[_ngcontent-%COMP%]:after{content:"";position:absolute;left:50%;top:50%;width:80%;height:2px;transform:translate(-50%,-50%) rotate(-45deg);background:var(--c-text-primary)}']})}return n})();var O=e(9902),P=e(7793),Z=e(9676);const j=[{path:"",component:y}];let J=(()=>{class n{static#t=this.\u0275fac=function(r){return new(r||n)};static#n=this.\u0275mod=t.oAB({type:n});static#e=this.\u0275inj=t.cJS({imports:[u.Bz.forChild(j),O.a,g.ez,P.h,i.u5,Z.U,m.lj]})}return n})()}}]);