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
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    // valid表示表单是否验证通过
                    if (valid) {
                        console.log("valid=", valid);
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
                                this.$router.push("/main")
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
            }
        },
        created() {
            console.log(this);
        }
    }
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