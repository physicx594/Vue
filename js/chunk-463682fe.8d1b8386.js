(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-463682fe"],{1010:function(t,a,o){"use strict";o.r(a);var n=function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"CheckoutSuccess"},[o("Navbar"),o("div",{staticClass:"thanks"}),o("div",{staticClass:"section"},[o("div",{staticClass:"h1 payed"},[t._v("付款完成")]),o("span",[t._v("我們已收到您的訂單，感謝您的支持")]),o("router-link",{attrs:{to:"/products"}},[o("button",{staticClass:"btn"},[t._v("再去逛逛")])])],1),o("Footer")],1)},i=[],e=o("bebf"),s=o("acd4"),r={name:"CheckoutSuccess",components:{Navbar:e["a"],Footer:s["a"]},created:function(){var t=this;this.$store.dispatch("updateLoading",!0),setTimeout((function(){t.$store.dispatch("updateLoading",!1)}),1e3)}},c=r,p=(o("a997"),o("2877")),l=Object(p["a"])(c,n,i,!1,null,null,null);a["default"]=l.exports},"1a4b":function(t,a,o){var n=o("aea1");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=o("499e").default;i("6a30c582",n,!0,{sourceMap:!1,shadowMode:!1})},"44df":function(t,a,o){"use strict";var n=o("7bcf"),i=o.n(n);i.a},"473b":function(t,a,o){var n=o("24fb");a=n(!1),a.push([t.i,".CheckoutSuccess{position:relative;height:100%}.CheckoutSuccess .thanks{width:100%;height:50%;background-attachment:fixed;background-size:cover;background:url(https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&ixlib=rb-1.2.1&q=80&w=1500) no-repeat 50%}.CheckoutSuccess .section{width:100%;min-height:50%;padding:64px 10px;margin:0 0 -64px}.CheckoutSuccess .section .payed{font-weight:700;color:#264710}.CheckoutSuccess .section span{display:block;font-weight:700;font-size:20px;background-image:linear-gradient(90deg,#264710 30%,maroon);-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:8px}.CheckoutSuccess .section .btn{border-radius:50px;border:1px solid maroon;background:maroon;color:#fff;padding:5px 30px}.CheckoutSuccess .footer{height:64px}@media screen and (max-width:768px){.CheckoutSuccess .section .payed{font-size:30px}.CheckoutSuccess .section span{font-size:13px}}",""]),t.exports=a},"5a7a":function(t,a,o){var n=o("24fb");a=n(!1),a.push([t.i,".shoppingCart{position:fixed;right:-500px;top:106px;width:100%;max-width:500px;max-height:480px;color:#000;overflow-x:hidden;overflow-y:scroll;background-color:#fff;box-shadow:0 2px 6px 0 rgba(0,0,0,.06);transition:all .5s ease-out;z-index:2000}.shoppingCart.show{right:10px}.shoppingCart table{width:100%}.shoppingCart table .name,.shoppingCart table .price,.shoppingCart table .qty,.shoppingCart table .total{width:20%}.shoppingCart table .del,.shoppingCart table .pic{width:10%}.shoppingCart table th{border:none}.shoppingCart table td,.shoppingCart table th{padding:8px}.shoppingCart table td img,.shoppingCart table th img{width:50px;height:50px}.shoppingCart table .delete{color:maroon;border:1px solid maroon}.shoppingCart table .delete:hover{background:maroon;color:#fff}.shoppingCart .footer .totalPrice{width:100%;display:flex;justify-content:center;background-color:#f7f7f7;margin:16px 0}.shoppingCart .footer .load{width:100%;height:24px;text-align:center;letter-spacing:10px;background:linear-gradient(45deg,#fec81a,#fec81a 20%,#2a5529 0,#2a5529 45%,#fec81a 0,#fec81a 70%,#2a5529 0,#2a5529 95%,#fec81a 0,#fec81a);background-size:30px 30px;background-position:0 0;-webkit-animation:loading .5s linear infinite;animation:loading .5s linear infinite}@-webkit-keyframes loading{0%{background-position:0 0}to{background-position:30px 0}}@keyframes loading{0%{background-position:0 0}to{background-position:30px 0}}.shoppingCart .footer .checkout{padding:5px 30px;margin:0 auto;background:transparent;color:#2a5529;border-radius:50px}.shoppingCart .btn,.shoppingCart .empty{color:#2a5529;font-weight:700}.shoppingCart .btn{border-radius:50px;border:1px solid #2a5529}.shoppingCart .btn:hover{background:#2a5529;color:#fec81a}.shoppingCart .goShopping{padding:5px 30px}@media screen and (max-width:768px){.shoppingCart{max-width:300px;font-size:13px}.shoppingCart table tbody tr td:first-child,.shoppingCart table thead tr th:first-child{display:none}.shoppingCart table td{padding:8px 0}.shoppingCart table td .input-group{justify-content:center}.shoppingCart table td .input-group-append .btn,.shoppingCart table td .input-group-prepend .btn{width:20px;padding:0}}",""]),t.exports=a},"7bcf":function(t,a,o){var n=o("5a7a");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=o("499e").default;i("6df52462",n,!0,{sourceMap:!1,shadowMode:!1})},"87b4":function(t,a,o){"use strict";var n=o("1a4b"),i=o.n(n);i.a},"954a":function(t,a,o){var n=o("dc8b");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=o("499e").default;i("bb595b3c",n,!0,{sourceMap:!1,shadowMode:!1})},a997:function(t,a,o){"use strict";var n=o("c8f9"),i=o.n(n);i.a},acd4:function(t,a,o){"use strict";var n=function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"Footer"},[o("div",{staticClass:"container"},[t._m(0),o("div",{staticClass:"feature"},[o("router-link",{staticClass:"gobackend",attrs:{to:"/admin/products"}},[t._v("｜後台管理｜")]),o("a",{staticClass:"fab fa-github ",attrs:{href:"https://github.com/physicx594?tab=repositories",target:"_blank"}})],1)])])},i=[function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"footer_section"},[o("span",[t._v("© 2020 Healthy Diet All Rights Reserved.")])])}],e=(o("87b4"),o("2877")),s={},r=Object(e["a"])(s,n,i,!1,null,null,null);a["a"]=r.exports},aea1:function(t,a,o){var n=o("24fb");a=n(!1),a.push([t.i,".Footer{background:#f7f7f7}.Footer .container{width:100%;height:100%;max-height:64px;background:#f7f7f7;padding:20px;font-size:16px;text-align:left;display:flex;justify-content:space-between;align-items:center}.Footer .container .footer_section span{font-weight:700;color:#264710}.Footer .container .feature{display:flex;justify-content:center;align-items:center}.Footer .container .feature a{color:#264710}@media screen and (max-width:992px){.Footer .container{justify-content:center;max-height:80px;font-size:13px}.Footer .container span span{display:block}.Footer .container a{display:none}}",""]),t.exports=a},bebf:function(t,a,o){"use strict";var n=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"NavBar"},[n("div",{staticClass:"top"},[n("div",{staticClass:"container"},[n("router-link",{staticClass:"p-0",attrs:{to:"/"}},[n("img",{attrs:{src:o("cf05"),width:"60"}})]),n("div",{staticClass:"menu",class:{show:t.show},on:{click:function(a){t.show=!t.show}}},[n("span"),n("span"),n("span")]),n("ul",{staticClass:"linkList"},[n("li",{},[n("router-link",{staticClass:"nav-link",attrs:{to:"/"}},[n("span",[t._v(" 首頁 ")])])],1),n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link",attrs:{to:"/products"}},[n("span",[t._v(" 產品列表 ")])])],1),n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link",attrs:{to:"/about"}},[n("span",[t._v(" 關於我們 ")])])],1),t._m(0),n("li",{staticClass:"nav-item ",on:{click:function(a){a.preventDefault(),t.openCart=!0}}},[n("span",{staticClass:"cart",class:{openCart:t.openCart}},[n("i",{staticClass:"fas fa-shopping-cart",staticStyle:{"font-size":"18px"}})]),t.cart.length>0?n("div",{staticClass:"cartQTY"},[t._v(t._s(t.cart.length))]):t._e()])])],1)]),n("div",{staticClass:"columnNav",class:{show:t.show}},[n("ul",[n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link",attrs:{to:"/"}},[n("span",[t._v(" 首頁 ")])])],1),n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link",attrs:{to:"/products"}},[n("span",[t._v(" 產品列表 ")])])],1),n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link",attrs:{to:"/about"}},[n("span",[t._v(" 關於我們 ")])])],1),n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link",attrs:{to:""}},[n("span",{staticClass:"member"},[t._v(" 會員專區 ")])])],1),n("li",{staticClass:"nav-item ",on:{click:function(a){a.preventDefault(),t.openCart=!0,t.show=!1}}},[n("router-link",{staticClass:"nav-link",attrs:{to:""}},[n("span",{staticClass:"cart",class:{openCart:t.openCart}},[t._v(" 購物車"),t.cart.length>0?n("span",[t._v("( "+t._s(t.cart.length)+" )")]):t._e()])])],1)])]),n("ShoppingCart",{attrs:{openCart:t.openCart,cart:t.cart,totalPrice:t.totalPrice},on:{close:t.closeCart}}),n("div",{staticClass:"mask",class:{open:t.openCart,show:t.show},on:{click:function(a){return a.preventDefault(),t.mask(a)}}})],1)},i=[function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("li",{staticClass:"nav-item"},[o("span",{staticClass:"member"},[o("i",{staticClass:"fas fa-user",staticStyle:{"font-size":"18px"}})])])}],e=(o("99af"),function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"shoppingCart p-2",class:{show:t.openCart}},[0!==t.totalPrice?o("div",[o("table",{staticClass:"table mb-0"},[t._m(0),o("tbody",t._l(t.cart,(function(a,n){return o("tr",{key:n,attrs:{scope:"row"}},[o("td",[o("img",{attrs:{src:a.product.imageUrl[0]}})]),o("td",[t._v(t._s(a.product.title))]),a.product.price?o("td",[t._v(t._s(t._f("money")(a.product.price)))]):o("td",[t._v(t._s(a.product.title)+t._s(t._f("money")(a.product.origin_price)))]),o("td",[o("div",{staticClass:"input-group"},[o("div",{staticClass:"input-group-prepend"},[o("button",{staticClass:"btn",attrs:{type:"button",disabled:1===a.quantity||!0===t.formLoading},on:{click:function(o){return t.changeQuantity(a,a.quantity-1)}}},[t._v("-")])]),o("input",{directives:[{name:"model",rawName:"v-model",value:a.quantity,expression:"item.quantity"}],staticClass:"form-control quantity text-center p-0",attrs:{type:"text",min:"1",onkeyup:"value=value.replace(/^(0+)|[^\\d]+/g,'')"},domProps:{value:a.quantity},on:{change:function(o){return t.changeQuantity(a,a.quantity)},input:function(o){o.target.composing||t.$set(a,"quantity",o.target.value)}}}),o("div",{staticClass:"input-group-append"},[o("button",{staticClass:"btn",attrs:{type:"button",disabled:!0===t.formLoading},on:{click:function(o){return t.changeQuantity(a,a.quantity+1)}}},[t._v("+")])])])]),o("td",[o("button",{staticClass:"btn delete",attrs:{type:"button",disabled:!0===t.formLoading},on:{click:function(o){return t.delItem(a.product.id)}}},[o("i",{staticClass:"far fa-trash-alt fa-1x"})])])])})),0)]),o("div",{staticClass:"footer"},[!1===t.formLoading?o("div",{staticClass:"totalPrice"},[o("div",{staticClass:"mr-1"},[t._v("小計:")]),t.totalPrice?o("div",{staticClass:" text-danger font-weight-bolder"},[t._v(t._s(t._f("money")(t.totalPrice)))]):t._e()]):o("div",{staticClass:"load"}),o("router-link",{attrs:{to:"/cart"}},[!1===t.formLoading?o("button",{staticClass:"btn checkout",on:{click:t.closeCart}},[t._v("前往購物車")]):t._e()])],1)]):o("div",{staticClass:"py-3"},[o("h3",{staticClass:"empty mb-5"},[t._v("購物車是空的")]),o("router-link",{attrs:{to:"/products"}},[o("button",{staticClass:"btn goShopping",on:{click:t.closeCart}},[t._v("來去購物")])])],1)])}),s=[function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("thead",{staticClass:"table"},[o("tr",{attrs:{scope:"row"}},[o("th",{staticClass:"pic"}),o("th",{staticClass:"name"},[t._v("品名")]),o("th",{staticClass:"price"},[t._v("單價")]),o("th",{staticClass:"qty"},[t._v("數量")]),o("th",{staticClass:"del"})])])}],r={name:"ShoppingCart",props:["openCart","cart","totalPrice"],data:function(){return{isLoading:!1}},methods:{changeQuantity:function(t,a){this.$store.dispatch("changeQuantity",{item:t,quantity:a})},delItem:function(t){this.$store.dispatch("delItem",t)},delAll:function(){var t=this;this.isLoading=!0;var a="".concat("https://course-ec-api.hexschool.io/api","/").concat("959cce3f-fa83-4b05-98f8-f72861d9cdc1","/ec/shopping/all/product");this.axios.delete(a).then((function(a){t.$emit("update"),t.isLoading=!1}))},closeCart:function(){this.$emit("close")}},computed:{formLoading:function(){return this.$store.state.formLoading}}},c=r,p=(o("44df"),o("2877")),l=Object(p["a"])(c,e,s,!1,null,null,null),u=l.exports,d={name:"Navbar",components:{ShoppingCart:u},data:function(){return{show:!1,openCart:!1,cancel:!1}},methods:{mask:function(){!1===this.show?this.openCart=!this.openCart:!1===this.openCart?this.show=!this.show:!0===this.show&&!0===this.openCart&&(this.show=!this.show,this.openCart=!this.openCart)},getCart:function(){this.$store.dispatch("getCart")},clearBus:function(){this.$bus.$off("get-cart")},clearCart:function(){var t="".concat("https://course-ec-api.hexschool.io/api","/").concat("959cce3f-fa83-4b05-98f8-f72861d9cdc1","/ec/shopping/all/product");this.axios.delete(t).then((function(t){console.log(t)}))},closeCart:function(){this.openCart=!1}},computed:{cart:function(){return this.$store.state.cart},totalPrice:function(){return this.$store.state.totalPrice}},created:function(){var t=this;this.getCart(),this.$bus.$on("get-cart",(function(){t.getCart()}))},beforeDestroy:function(){this.clearBus()}},h=d,f=(o("f9f2"),Object(p["a"])(h,n,i,!1,null,null,null));a["a"]=f.exports},c8f9:function(t,a,o){var n=o("473b");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=o("499e").default;i("6513c9be",n,!0,{sourceMap:!1,shadowMode:!1})},cf05:function(t,a,o){t.exports=o.p+"img/logo.555c05fc.png"},dc8b:function(t,a,o){var n=o("24fb");a=n(!1),a.push([t.i,'.NavBar{width:100%;position:relative}.NavBar .top{width:100%;margin:0 auto;position:fixed;top:0;left:0;z-index:1030;background:#fff;box-shadow:0 2px 6px 0 rgba(0,0,0,.06)}.NavBar .top .container{position:relative;display:flex;justify-content:space-between;align-items:center;padding:8px 16px;max-height:80px}.NavBar .top ul{display:flex;align-items:center;list-style:none;margin:0}.NavBar .top ul .cart,.NavBar .top ul .member,.NavBar .top ul .nav-link{position:relative;font-size:16px;font-weight:700;margin-right:10px;padding:0 10px;transition:.5s;color:#264710}.NavBar .top ul .nav-link.active,.NavBar .top ul .nav-link:hover{color:maroon}.NavBar .top ul .nav-link.active:after,.NavBar .top ul .nav-link:hover:after{width:50%}.NavBar .top ul .nav-link:after{content:"";display:block;margin:0 auto;width:0;height:1px;background:maroon;transition:.5s}.NavBar .top ul .nav-item{position:relative;cursor:pointer}.NavBar .top ul .nav-item:hover .cart,.NavBar .top ul .nav-item:hover .member{color:maroon}.NavBar .top ul .nav-item:hover .cart~.cartQTY,.NavBar .top ul .nav-item:hover .member~.cartQTY{color:maroon;border:1px solid maroon}.NavBar .top ul .nav-item .cart.openCart{color:maroon}.NavBar .top ul .nav-item .cart.openCart~.cartQTY{color:maroon;border:1px solid maroon}.NavBar .top ul .nav-item .cartQTY{box-sizing:content-box;position:absolute;right:0;top:0;width:20px;height:20px;border-radius:50px;line-height:20px;font-size:14px;text-align:center;background:#fff;color:#264710;transform:translateX(-10px) translateY(-10px);transition:.5s;border:1px solid #264710}@media screen and (max-width:768px){.NavBar .top .container{display:flex;justify-content:space-between}.NavBar .top .container .menu{position:relative}.NavBar .top .container .menu span{display:block;margin:5px auto;width:30px;height:3px;background:#264710;transition:.3s ease-in}.NavBar .top .container .menu.show span:first-child{transition:.3s ease-in-out;transform:rotate(45deg) translate(7px,9px)}.NavBar .top .container .menu.show span:nth-child(2){transition:.3s ease-in-out;transform:rotate(-45deg) translate(-3px)}.NavBar .top .container .menu.show span:nth-child(3){transition:.3s ease-in-out;transform:rotate(-45deg) translate(2.5px,-5.5px)}.NavBar .top .container img{width:80px}.NavBar .top .container ul{display:none}}.NavBar .columnNav{position:fixed;top:80px;width:100%;height:0%;background:hsla(0,0%,100%,.95);transition:all .3s ease-in-out;overflow:hidden;box-shadow:0 2px 6px 0 rgba(0,0,0,.1);z-index:2001}@media screen and (max-width:768px){.NavBar .columnNav{font-family:Arial}.NavBar .columnNav ul{padding:20px 0;margin:0;list-style:none}.NavBar .columnNav ul a{font-size:24px;font-weight:500;margin:5px;color:#264710}.NavBar .columnNav ul a:active{background:#264710;color:#fff}.NavBar .columnNav.show{height:330px;transition:all .3s ease-in-out}}.NavBar .mask{display:none;position:fixed;top:0;bottom:0;left:0;right:0;background:hsla(0,0%,100%,0);z-index:1999}.NavBar .mask.open,.NavBar .mask.show{display:block}',""]),t.exports=a},f9f2:function(t,a,o){"use strict";var n=o("954a"),i=o.n(n);i.a}}]);
//# sourceMappingURL=chunk-463682fe.8d1b8386.js.map