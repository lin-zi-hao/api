<template>
  <div id="app">
    <keep-alive include="userlist">
    <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    },
    provide(){
      return{
        reload:this.reload
      }
    },
    data() {
      return {
        isRouterAlive:true
      }
    },
    methods:{
      reload() {
        this.isRouterAlive = false;
        this.$nextTick( () => {
        this.isRouterAlive = true;
      })
    }
    }
  }
</script>

<style>
  .el-table{
    font-size: 12px;
  }
</style>