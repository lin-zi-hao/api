<template>
    <el-container style="height:100%">
        <el-aside width="200px" style="height:100%;background: #304156;">
            <div class="backstage">
                <img src="../assets/logo1.png" alt="" class="logo">
                <span class="backstage1">后台管理系统</span>
            </div>
            <el-menu router default-active="1-4-1" class="el-menu-vertical-demo" background-color="#304156"
                text-color="#fff" active-text-color="#ffd04b" style="border:none" v-for="item in sidebar"
                :key="item.text">
                <el-submenu index="1">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.text}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="baseUrl + item1.path" v-for="item1 in item.children" :key="item1.text">
                            {{item1.text}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="display:flex; align-items:center;justify-content: space-between;">
                <div style="display:flex; align-items:center; justify-content:start;">
                    <i class="el-icon-s-unfold" style="margin-right:20px"></i>
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:60px">
                        <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-button type="danger" size="small" @click="signOut" style="margin-right:20px">退出
                </el-button>
            </el-header>
            <el-main style="background:#f0f2f5">
                <!-- 用来显示main子路由的页面 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                // 右侧菜单栏数据
                sidebar: [{
                        text: "用户管理",
                        icon: "el-icon-s-custom",
                        children: [{
                            path: "/userlist",
                            text: "用户列表",
                            icon: "el-icon-menu"
                        }]
                    },
                    {
                        text: "权限管理",
                        icon: "el-icon-lock",
                        children: [{
                            path: "/rolelist",
                            text: "角色列表",
                            icon: "el-icon-menu"
                        }, {
                            path: "/permissionlist",
                            text: "权限列表",
                            icon: "el-icon-menu"
                        }]
                    },
                    {
                        text: "商品管理",
                        icon: "el-icon-goods",
                        children: [{
                            path: "/productlist",
                            text: "商品列表",
                            icon: "el-icon-menu"
                        }, {
                            path: "/classification",
                            text: "分类参数",
                            icon: "el-icon-menu"
                        }, {
                            path: "/categories",
                            text: "商品分类",
                            icon: "el-icon-menu"
                        }]
                    },
                    {
                        text: "订单管理",
                        icon: "el-icon-s-order",
                        children: [{
                            path: "/orderlist",
                            text: "订单列表",
                            icon: "el-icon-menu"
                        }]
                    },
                    {
                        text: "数据统计",
                        icon: "el-icon-s-marketing",
                        children: [{
                            path: "/datalist",
                            text: "数据列表",
                            icon: "el-icon-menu"
                        }]
                    }
                ],
                baseUrl: "/main",
                isCollapse: true
            }
        },
        methods: {
            signOut() {

                this.$router.push("/login");

            }
        },
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

    .myaside {
        height: 100%;
    }

    .logo {
        width: 32px;
        height: 32px;
        padding-right: 15px;
    }

    .backstage {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .backstage1 {
        font-size: 16px;
        height: 60px;
        text-align: center;
        color: #fff;
        line-height: 60px;
    }
</style>