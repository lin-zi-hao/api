<template>
    <div>
        <div style="display:flex;justify-content: center">
            <el-form status-icon class="demo-ruleForm from-login" ref="ruleForm" :model="FormData" :rules="rules">
                <div class="block">
                    <el-avatar shape="circle" :size="80">
                        <img src="../assets/head.jpg" alt="">
                    </el-avatar>
                </div>
                <el-form-item prop="username">
                    <el-input type="text" autocomplete="off" v-model="FormData.username"
                        prefix-icon="iconfont el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" autocomplete="off" v-model="FormData.password"
                        prefix-icon="iconfont el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item style="text-align:right">
                    <el-button type="primary" @click="submitForm('FormData')">登录</el-button>
                    <el-button @click="resetting('FormData')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
           
            return {
                // 登录校验
                FormData: {
                    username: 'admin',
                    password: '123456',
                },
                rules: {
                    username: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 16,
                            message: '长度在 3 到 16 个字符',
                            trigger: 'blur'
                        }
                    ],
                    password: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 10,
                            message: '长度在 3 到 10 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        computed:{
            allDa(){
                return this.$store.state.role.allData
            }
        },
        beforeRouteEnter (to, from, next) {
            next()
        },

        methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    // valid表示表单是否验证通过
                    if (valid) {
                        //输入框的用户名和数组的username对比，匹配成功就返回当前匹配成功的数据
                         let u = this.allDa.find(item=>{
                            return item.username==this.FormData.username
                        })
                        //如果为状态为false的时候，代表用户没有登录权限
                        if(!u.flag){
                           this.$message({
                               type:"warning",
                               message:"用户没有权限登录"
                           })
                           return
                        }
                         //如果为状态为true的时候，代表用户没有登录权限
                        const {
                            username,
                            password
                        } = this.FormData
                        this.$request.post("/user/login", {
                            username,
                            password
                        }).then(({
                            data
                        }) => {
                            if (data.code === 200) {
                                this.$message({
                                    showClose: true,
                                    message: "登陆成功",
                                    type: "success"
                                })
                                localStorage.setItem("userInfo", JSON.stringify(data.data))
                                this.$router.push("/main/welcome")
                            } else if (data.code === 401) {
                                this.$message.error('登录失败');
                            }
                        })
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            resetting() {
                this.FormData.username = "admin",
                this.FormData.password = "123456"
                console.log(this.allDa);
            }
        },
        created() {
            this.$store.dispatch("getAll");
        }
    }

    //首先改变数据库一个flag字段为boolean，
    //然后在全局状态管理获取数据库的信息，并且写入state属性里面的数据
    //用到数据的方法find
    //然后在login进行判断，首先要让浏览器知道你输入的username和数据库里面的username对比，如果匹配成功就返回当前数据
    //然后使用当前数据下的flag去判断是否可以登录，false不可以登录，true是可以登录
</script>
<style scoped>
    .from-login {
        background: #f0f2f5;
        padding: 20px 50px 20px 50px;
        width: 350px;
        border-radius: 10px;
        margin-top: 100px;
    }

    .block {
        text-align: center;
    }
</style>