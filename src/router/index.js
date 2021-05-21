import Router from "vue-router";
import Vue from "vue";
import login from "../components/login.vue";
import main from "../components/main.vue";

// 引入main的子组件
import userlist from "../components/main/userlist.vue";
import rolelist from "../components/main/rolelist.vue";
import permissionlist from "../components/main/permissionlist.vue";
import productlist from "../components/main/productlist.vue";
import classification from "../components/main/classification.vue";
import categories from "../components/main/categories.vue";
import orderlist from "../components/main/orderlist.vue";
import datalist from "../components/main/datalist.vue";
import welcome from "../components/main/welcome.vue";

Vue.use(Router);

const routes = [{
  path: "",
  redirect: "/login"
}, {
  name: "login",
  path: "/login",
  component: login,
}, {
  name: "main",
  path: "/main",
  component: main,
  children: [{
    name: "userlist",
    path: "userlist",
    component: userlist,
  }, {
    name: "rolelist",
    path: "rolelist",
    component: rolelist
  }, {
    name: "permissionlist",
    path: "permissionlist",
    component: permissionlist
  }, {
    name: "productlist",
    path: "productlist",
    component: productlist
  }, {
    name: "classification",
    path: "classification",
    component: classification
  }, {
    name: "categories",
    path: "categories",
    component: categories
  }, {
    name: "orderlist",
    path: "orderlist",
    component: orderlist
  }, {
    name: "datalist",
    path: "datalist",
    component: datalist
  },{
    name: "welcome",
    path: "welcome",
    component: welcome
}]
}];

const router = new Router({
  routes,
  mode: "history"
})

router.beforeEach=function(to,form,next){
  //校验token登录状态


  next()

} 
export default router