<template>
    <div>
        <el-form status-icon label-width="100px" class="demo-ruleForm from-login" ref="ruleForm" :model="FormData">
            <div class="block">
                <el-avatar shape="circle" :size="80">
                    <img src="../../assets/head.jpg" alt="">
                </el-avatar>
            </div>
            <el-form-item label="用户" prop="username">
                <el-input type="password" autocomplete="off" v-model="FormData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" autocomplete="off" v-model="FormData.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('FormData')">登录</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // 登录校验
                FormData: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    password: [{
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>
<style>
    body {
        background: #5dbe8a;
    }

    .from-login {
        background: #ffffff;
        padding: 20px 50px 20px 0;
        width: 400px;
        margin: 100px auto;
        border-radius: 10px;
    }

    .block {
        padding-left: 50px;
        text-align: center;
    }
</style>