import{_ as d,j as n,r as a,o as i,c as _,a as r,b as t,w as c,d as o,F as h}from"./index-3Ds7k2Tn.js";var l={VITE_URL:"https://ec-course-api.hexschool.io",VITE_PATH:"owen-hexschool",BASE_URL:"/vue-hex-week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:p}=l,m={methods:{checkAdmin(){n.post(`${p}/v2/api/user/check`).then(e=>{console.log("驗證成功",e.data.success)}).catch(()=>{this.$router.push("/login")})},openProduct(e){this.productCheck=e}},mounted(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)hexVueToken\s*=\s*([^;]*).*$)|^.*$/,"$1");n.defaults.headers.common.Authorization=e,this.checkAdmin()}},f=r("h2",null,"這是後台",-1);function k(e,V,x,R,$,w){const s=a("RouterLink"),u=a("RouterView");return i(),_(h,null,[f,r("nav",null,[t(s,{to:"/admin/products"},{default:c(()=>[o("產品列表")]),_:1}),o(" | "),t(s,{to:"/admin/order"},{default:c(()=>[o("訂單列表")]),_:1}),o(" | "),t(s,{to:"/"},{default:c(()=>[o("回到前台")]),_:1})]),t(u)],64)}const v=d(m,[["render",k]]);export{v as default};
