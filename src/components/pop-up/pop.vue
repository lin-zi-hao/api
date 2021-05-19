<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom:20px">
      <slot></slot>
    </el-button>
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
        </el-dialog>
  </div>
</template>

<script>
import btn from "../btn/btn"
export default {
  name:"pop",
  inject:["reload"],
  data() {
    return {
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
    btn
  },
  methods:{
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
           }
  }
}
</script>