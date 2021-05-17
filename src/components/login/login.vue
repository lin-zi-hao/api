<template>
    <div>
        <div class="demo-fit">
            <div class="block">
                <span class="title"></span>
                <el-avatar shape="circle" :size="100"></el-avatar>
            </div>
        </div>
        <el-form status-icon label-width="100px" class="demo-ruleForm from-login">
            <el-form-item label="用户" prop="username">
                <el-input type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
<style>
    .from-login {
        width: 450px;
        margin: 100px auto;
    }
</style>