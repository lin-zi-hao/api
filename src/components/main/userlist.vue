<template>
    <div style="background:#ffffff;border:7px;">
        <div style="margin:15px 0 20px 0;padding:10px 0 0 10px;">
            <el-input placeholder="请输入内容" class="input-with-select" style="width:380px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" style="margin-left:30px" @click="dialogFormVisible = true">添加用户</el-button>
        </div>
        <div>
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
                    <el-switch v-model="row.flag" @change="changeswitch(row._id,$event)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column property="operation" label="操作" width="200">
                <template v-slot:default="{row}">
                    <el-tooltip class="item" effect="dark" content="编辑用户" placement="top">
                        <el-button size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="更改用户权限" placement="top">
                        <el-button size="mini" type="warning" @click="dialogTableVisible=row._id" style="margin-right:10px"><i
                                class="el-icon-setting"></i></el-button>
                    </el-tooltip>
                    <el-dialog title="分配角色" :visible="dialogTableVisible==row._id">
                        <el-form :model="form">
                            <el-form-item label="当前的用户：" :label-width="formLabelWidth">
                               <span>{{row.username}}</span>
                            </el-form-item>
                            <el-form-item label="当前的角色：" :label-width="formLabelWidth">
                               <span>{{row.role}}</span>
                            </el-form-item>
                            <el-form-item label="活动区域" :label-width="formLabelWidth">
                                <el-select v-model="form.region" placeholder="请选择活动区域"  @change="gRole" clearable>
                                    <el-option v-for="(item,idx) in getR" :key="item+idx"  :value="item.role" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogTableVisible = false">取 消</el-button>
                            <el-button type="primary" @click="role1(row._id)">确 定</el-button>
                        </div>
                    </el-dialog>

                    <el-tooltip class="item" effect="dark" content="删除用户" placement="top">
                        <el-button size="mini" type="danger" @click="open(row._id)"><i class="el-icon-delete"></i>
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination :page-sizes="[4, 6, 8, 10]" :page-size="size" style="padding:20px"
                        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="changePage" @current-change="changeC">
                    </el-pagination>
                </div>
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
        inject:["reload"],
        data() {
            let checkPhone = (rule, value, callback) => {
                    if(value) {
                     const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                      if (reg.test(value)) {
                        this.$request.get("/user/check/phone", {
                            params: {
                                phone: value
                            }
                        }).then(({
                            data
                        }) => {
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
            let checkEmail = (rule,value,callback)=>{
                if(value){
                    this.$request.get("/user/check/email",{
                        params:{
                            email:value
                        }
                    }).then(({data})=>{
                        if(data.code===400){
                            callback(new Error("邮箱已存在"));
                        }else if(data.code===200){
                            callback()
                        }
                    })
                }
            }
            let checkUser = (rule,value,callback)=>{
                if(value){
                    this.$request.get("/user/check/user1",{
                        params:{
                            username:value
                        }
                    }).then(({data})=>{
                        if(data.code===400){
                            callback(new Error("用户名已存在"));
                        }else if(data.code===200){
                            callback()
                        }
                    })
                }
            }
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
                    username: [
                        {
                        required: true,
                        validator: checkUser,
                        trigger: 'blur'
                        },{
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
                    email: [
                        {
                            required: true,
                            message: '请输入邮箱',
                            trigger: 'blur'
                        },
                         {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        validator: checkEmail,
                        trigger: 'blur'
                    }],
                    phone: [
                        {
                            required: true,
                            message: '请输入手机号码',
                            trigger: 'blur'
                        },{
                        required: true,
                        validator: checkPhone,
                        trigger: 'blur'
                    }]
                },
                size:4,
                total:0
            }
        },
        computed:{
            getR(){
                return this.$store.state.role.role
            }
        },
        methods: {
            //修改用户状态，是否可以登录
            changeswitch(id,flag) {
                console.log(flag);
                this.$request.put("/user/changeF",{
                    id,
                    flag
                }).then(({data})=>{
                    if(data.code===200){
                    this.$message({
                        message: '更新用户状态成功',
                        type: 'success'
                    });
                    }else if(data.code===400){
                    this.$message({
                        message: '更新用户状态失败',
                        type: 'warning'
                    });
                    }
                })  
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
                            this.reload()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            open(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
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
                    this.reload();
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },  
            //当每页发生变化时就会触发该函数
            changePage(size){
            this.size = size
            this.getDate(0,this.size);
            },
            
            //获取数据
            getDate(i=0,size){
                this.$request.get("/user/all1",{
                    params:{
                       skip:i*size,
                       limit:size, 
                    }
                }).then(({
                data
            }) => {
                this.tableData = data.data.map((item, index) => {
                    item.value = `value${index+1}`;
                    return item
                });
                this.total=data.total
            })
            },
            //当页数发生变化时
            changeC(i){
                this.getDate(i-1,this.size);
            },
            gRole(r){
                localStorage.setItem("role",JSON.stringify(r));
            },
            role1(id){
                let r = JSON.parse(localStorage.getItem("role"));
                this.$store.dispatch("judge",{r,id})
                this.reload()
            }
        },
        created() {
            this.getDate(0,this.size);
            this.$store.dispatch("getRole");
            
        }
    }
</script>