<template>
    <div style="background:#ffffff;border:7px;">
        <div style="margin:15px 0 20px 0;padding:10px 0 0 10px;">
            <el-input placeholder="请输入内容" class="input-with-select" style="width:380px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" style="margin-left:30px" @click="dialogFormVisible = true">添加用户</el-button>
        </div>
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%;padding:0 10px 0 10px;">
            <el-table-column type="index" label="#">
            </el-table-column>
            <el-table-column property="username" label="姓名">
            </el-table-column>
            <el-table-column property="email" label="邮箱">
            </el-table-column>
            <el-table-column property="phone" label="电话">
            </el-table-column>
            <el-table-column property="role" label="角色">
            </el-table-column>
            <el-table-column property="state" label="状态">
                <template v-slot:default="{row}">
                    <el-switch v-model="row.value" @change="changeswitch">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column property="operation" label="操作" width="190">
                <template v-slot:default="{row}">
                    <el-button size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
                    <el-button size="mini" type="warning"><i class="el-icon-setting"></i></el-button>
                    <el-button size="mini" type="danger" @click="deleted(row._id)"><i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[4, 6, 8, 10]" :page-size="30" style="padding:20px"
                layout="total, sizes, prev, pager, next, jumper" :total="30">
            </el-pagination>
        </div>

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
                    <el-input type="text" autocomplete="off" v-model="form.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入手机号'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    if (reg.test(value)) {
                        this.$request.get("/user/check/phone", {
                            params: {
                                phone: value
                            }
                        }).then(({
                            data
                        }) => {
                            console.log(data);
                            if (data.code === 400) {
                                callback(new Error("手机号已存在"))
                            } else if (data.code === 200) {
                                callback();
                            }
                        })
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                tableData: [],
                currentRow: null,
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    username: "",
                    password: "",
                    email: "",
                    phone: "",
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
                    ],
                    email: [{
                        required: true,
                        validator: '请输入邮箱',
                        trigger: 'blur',
                    }, {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur'
                    }],
                    phone: [{
                        required: true,
                        validator: checkPhone,
                        trigger: 'blur'
                    }]
                },
            }
        },

        methods: {
            changeswitch() {
                this.$message({
                    message: '更新用户状态成功',
                    type: 'success'
                });
            },
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$request.post("/user/add", {
                            ...this.form
                        }).then(({
                            data
                        }) => {
                            if (data.code === 200) {
                                this.$message({
                                    message: "添加成功",
                                    type: "success"
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            deleted(id) {
                this.$request.delete("/user/remove", {
                    params: {
                        id,
                    }
                }).then(({
                    data
                }) => {
                    if (data.code === 200) {
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        })
                    }
                })
            },
        },
        created() {
            this.$request.get("/user/all").then(({
                data
            }) => {
                this.tableData = data.data.map((item, index) => {
                    item.role = "超级管理员";
                    item.value = `value${index+1}`;
                    return item
                });
            })
        }
    }
</script>