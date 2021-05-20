import Vuex from "vuex";


import Vue from "vue";
import role from "./roles/role"
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    role
  }
})

export default store