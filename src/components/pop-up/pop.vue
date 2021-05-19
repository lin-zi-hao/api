<template>
    <el-dialog title="添加用户名" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="ruleForm" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" autocomplete="off" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" autocomplete="off" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" autocomplete="off" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input type="password" autocomplete="off" v-model="form.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
</template>

<script>
    export default {

    }
</script>