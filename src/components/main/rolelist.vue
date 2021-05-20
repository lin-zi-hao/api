<template >
    <div style="padding:20px;background:#fff">
        <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom:20px">添加角色</el-button>
        <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="Roles" :model="form">
            <el-form-item label="角色名称" :label-width="formLabelWidth" prop="role">
            <el-input  autocomplete="off" v-model="form.role"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDes">
                <el-input  autocomplete="off" v-model="form.roleDes"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitForm" >确 定</el-button>
        </div>
        </el-dialog>
        <el-table
            :data="totalRole"
            border
            style="width: 100%">
            <el-table-column
            label=""
            width="50"
            >
            </el-table-column>
            <el-table-column
            type="index"
            label="#"
            width="180">
            </el-table-column>
            <el-table-column
            prop="role"
            label="角色名称"
            >
            </el-table-column>
            <el-table-column
            prop="roleDes"
            label="角色描述">
            </el-table-column>
            <el-table-column
            prop=""
            label="操作">
            <template #default="{row}">
                <el-tooltip content="编辑" placement="top" style="margin-right:10px">
                     <el-button type="primary" icon="el-icon-edit" size="mini" @click="dialogTableVisible = row._id">编辑</el-button> 
                </el-tooltip>
                    <el-dialog title="添加角色" :visible="dialogTableVisible==row._id">
                        <el-form :rules="rules" ref="Roles1" :model="form">
                            <el-form-item label="角色名称" :label-width="formLabelWidth" prop="role">
                            <el-input  autocomplete="off" v-model="form.role" ></el-input>
                            </el-form-item>
                            <el-form-item label="角色描述" :label-width="formLabelWidth">
                                <el-input  autocomplete="off" v-model="form.roleDes"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogTableVisible = false">取 消</el-button>
                            <el-button type="primary"  @click="submitForm1(row._id,row.role,row.roleDes)" >确 定</el-button>
                        </div>
                    </el-dialog>
                <el-tooltip content="分配权限" placement="top">
                <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                </el-tooltip>
                <el-tooltip content="删除" placement="top">
                     <el-button type="danger" icon="el-icon-delete" size="mini" @click="open(row._id)">删除</el-button>
                </el-tooltip>
             </template>
            </el-table-column>
        </el-table>
        
    </div>
</template>
<script>
    export default{
        inject:["reload"],
        data(){
            return{
            //    totalRole:[],
               dialogTableVisible: false,
               dialogFormVisible: false,
               formLabelWidth:"120px",
               form:{
                   role:"",
                   roleDes:""
               },
               rules:{
                role:[{
                        required: true, message: '请输入角色名称'
                   }],
               }
            }
        },
        components:{ 
        },
        computed:{
            totalRole(){
                return this.$store.state.role.role
            }
        },
        methods:{
           open(id){
               this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$request.delete("/update/remove",{
                            params:{
                                id
                            }
                        }).then(({data})=>{
                            if(data.code===200){
                                this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.reload()
                            }else if(data.code===400){
                                this.$message({
                                type: "fail",
                                message: '删除失败!'
                            });
                            }
                        })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
                    console.log(this.totalRole1);
           },
        //    getDate(){
        //         this.$request.get("/update/all").then(({data:{data:totalRole}})=>{
        //         console.log(totalRole);
        //         this.totalRole = totalRole;
        //     })
        //    },
           submitForm(){
               this.$refs.Roles.validate((valid)=>{
                   if(valid){
                       this.$request.post("/update/add",{
                          
                          role:this.form.role,
                          roleDes:this.form.roleDes 
                       }).then(({data})=>{
                           if(data.code===200){
                               this.$message({
                                   type:"success",
                                   message:"添加成功",
                               })
                               this.reload()
                           }else if(data.code===400){
                               this.$message({
                                   type:"fail",
                                   message:"添加失败",
                               })
                           }
                       })
                   }else{
                       console.log('error submit!!');
                       return false;
                   }
               })
           },
           submitForm1(id,role,roleDes){
               this.$refs.Roles1.validate((valid)=>{
                   if(valid){
                       this.$request.put("/update/amend1",{
                           id,
                           role:this.form.role || role,
                           roleDes:this.form.roleDes || roleDes
                       }).then(({data})=>{
                           if(data.code===200){
                               this.$message({
                                   type:"success",
                                   message:"修改成功"
                               })
                               this.reload();
                           }else if(data.code===400){
                               this.$message({
                                   type:"fail",
                                   message:"修改失败"
                               })
                           }
                       })
                   }
               })
           }
        },
        created(){
        //    this.getDate();
           this.$store.dispatch("getRole")
           console.log("store",this.$store);
        }
    }
</script>