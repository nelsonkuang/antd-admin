webpackJsonp([7],{49:126,55:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(9),d=l(n),r=a(19),u=l(r),s=a(1),i=l(s),c=a(3),o=l(c),m=function(e,t){var a={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(a[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,l=Object.getOwnPropertySymbols(e);n<l.length;n++)t.indexOf(l[n])<0&&(a[l[n]]=e[l[n]]);return a};t["default"]=function(e){var t,a=e.prefixCls,l=void 0===a?"ant-card":a,n=e.className,r=e.extra,s=e.bodyStyle,c=e.title,f=e.loading,p=e.bordered,h=void 0===p||p,y=m(e,["prefixCls","className","extra","bodyStyle","title","loading","bordered"]),b=e.children,g=(0,o["default"])(l,n,(t={},(0,u["default"])(t,l+"-loading",f),(0,u["default"])(t,l+"-bordered",h),t));f&&(b=i["default"].createElement("div",null,i["default"].createElement("p",{className:l+"-loading-block",style:{width:"94%"}}),i["default"].createElement("p",null,i["default"].createElement("span",{className:l+"-loading-block",style:{width:"28%"}}),i["default"].createElement("span",{className:l+"-loading-block",style:{width:"62%"}})),i["default"].createElement("p",null,i["default"].createElement("span",{className:l+"-loading-block",style:{width:"22%"}}),i["default"].createElement("span",{className:l+"-loading-block",style:{width:"66%"}})),i["default"].createElement("p",null,i["default"].createElement("span",{className:l+"-loading-block",style:{width:"56%"}}),i["default"].createElement("span",{className:l+"-loading-block",style:{width:"39%"}})),i["default"].createElement("p",null,i["default"].createElement("span",{className:l+"-loading-block",style:{width:"21%"}}),i["default"].createElement("span",{className:l+"-loading-block",style:{width:"15%"}}),i["default"].createElement("span",{className:l+"-loading-block",style:{width:"40%"}}))));var v=void 0;return v=c?"string"==typeof c?i["default"].createElement("div",{className:l+"-head"},i["default"].createElement("h3",{className:l+"-head-title"},c)):i["default"].createElement("div",{className:l+"-head"},i["default"].createElement("div",{className:l+"-head-title"},c)):null,i["default"].createElement("div",(0,d["default"])({},y,{className:g}),v,r?i["default"].createElement("div",{className:l+"-extra"},r):null,i["default"].createElement("div",{className:l+"-body",style:s},b))},e.exports=t["default"]},56:[1570,63],63:20,942:function(e,t){e.exports={option:"option___36qca",result:"result___2ZnzD",params:"params___2ZDyz",label:"label___3cebg"}},1476:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var n=(a(126),a(115)),d=l(n),r=(a(49),a(125)),u=l(r),s=(a(56),a(55)),i=l(s),c=(a(411),a(498)),o=l(c),m=(a(134),a(124)),f=l(m),p=(a(500),a(455)),h=l(p),y=a(505),b=l(y),g=a(9),v=l(g),E=a(412),N=l(E),k=a(16),w=l(k),q=a(18),_=l(q),R=a(17),x=l(R),j=a(1),O=l(j),C=a(942),L=l(C),M=a(470),S=l(M),z=a(75),P=[{url:location.origin+"/api/users",desc:"intercept request by mock.js"},{url:location.origin+"/api/users",desc:"intercept request by mock.js",method:"post",data:S["default"].mock({"id|+1":1e3,name:"@cname",nickName:"@last",phone:/^1[34578]\d{9}$/,"age|11-99":1,address:"@county(true)",isMale:"@boolean",email:"@email",createTime:"@datetime",avatar:function(){return S["default"].Random.image("100x100",S["default"].Random.color(),"#757575","png",this.nickName.substr(0,1))}})},{url:location.origin+"/api/users",desc:"intercept request by mock.js",method:"put",data:S["default"].mock({id:1,name:"@cname",nickName:"@last",phone:/^1[34578]\d{9}$/,"age|11-99":1,address:"@county(true)",isMale:"@boolean",email:"@email",createTime:"@datetime",avatar:function(){return S["default"].Random.image("100x100",S["default"].Random.color(),"#757575","png",this.nickName.substr(0,1))}})},{url:location.origin+"/api/users",desc:"intercept request by mock.js",method:"delete",data:S["default"].mock({id:10})},{url:location.origin+"/api/test",desc:"intercept request by mock.js",method:"get"},{url:z.config.baseURL+"/admin/order",desc:"cross-domain request, but match config.baseURL(./src/utils/config.js)"},{url:"http://www.zuimeitianqi.com/zuimei/queryWeather",data:{cityCode:"01010101"},desc:"cross-domain request by yahoo's yql"}],U=function(e){function t(a){(0,w["default"])(this,t);var l=(0,_["default"])(this,e.call(this,a));return l.handleRequest=function(){var e=l.state.currntRequest,t=(e.desc,(0,N["default"])(e,["desc"]));l.setState((0,v["default"])({},l.state,{result:O["default"].createElement("div",{key:"sending"},"\u8bf7\u6c42\u4e2d",O["default"].createElement("br",null),"url:",e.url,O["default"].createElement("br",null),"method:",e.method,O["default"].createElement("br",null),"params:",e.data?(0,b["default"])(e.data):"null",O["default"].createElement("br",null))})),(0,z.request)((0,v["default"])({},t)).then(function(e){var t=l.state;t.result=[l.state.result,O["default"].createElement("div",{key:"complete"},O["default"].createElement("div",null,"\u8bf7\u6c42\u5b8c\u6210"),(0,b["default"])(e))],l.setState(t)})},l.handeleURLChange=function(e){var t=l.state,a=e.split("?")[0],n=e.split("?")[1],d=P.filter(function(e){var t=e.method,l=void 0===t?"get":t;return a===e.url&&n===l});t.currntRequest=d[0],l.setState(t)},l.state={currntRequest:P[0],method:"get",result:""},l}return(0,x["default"])(t,e),t.prototype.componentDidMount=function(){this.handleRequest()},t.prototype.render=function(){var e={lg:12,md:24},t=this.state,a=t.result,l=t.currntRequest,n=l.method,r=void 0===n?"get":n;return O["default"].createElement("div",{className:"content-inner"},O["default"].createElement(d["default"],{gutter:32},O["default"].createElement(u["default"],e,O["default"].createElement(i["default"],{title:"Request",style:{overflow:"visible"}},O["default"].createElement("div",{className:L["default"].option},O["default"].createElement(h["default"],{style:{width:"100%",flex:1},defaultValue:r.toLocaleUpperCase()+"   "+P[0].url,size:"large",onChange:this.handeleURLChange},P.map(function(e,t){var a=e.method||"get";return O["default"].createElement(h["default"].Option,{key:t,value:e.url+"?"+a},a.toLocaleUpperCase()+"    ",e.url)})),O["default"].createElement(f["default"],{type:"primary",style:{width:100,marginLeft:16},onClick:this.handleRequest},"\u53d1\u9001")),O["default"].createElement("div",{className:L["default"].params},O["default"].createElement("div",{className:L["default"].label},"Params\uff1a"),O["default"].createElement(o["default"],{disabled:!0,value:l.data?(0,b["default"])(l.data):"null",size:"large",style:{width:200},placeholder:"null"}),O["default"].createElement("div",{style:{flex:1,marginLeft:16}},l.desc)),O["default"].createElement("div",{className:L["default"].result},a)))))},t}(O["default"].Component);t["default"]=U,e.exports=t["default"]}});