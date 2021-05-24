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
  body {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    html {
        height: 100%;
    }

    #app {
        height: 100%;
    }
</style>