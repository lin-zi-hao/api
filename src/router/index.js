import Router from "vue-router";
import Vue from "vue";
import login from "../components/login/login.vue";

Vue.use(Router);

const routes = [{
  path: "",
  redirect: "/login"
}, {
  name: "login",
  path: "/login",
  component: login
}];

const router = new Router({
  routes,
  mode: "history"
})

export default router