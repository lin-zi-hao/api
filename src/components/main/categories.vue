<template>
    <div style="padding:20px;background:#fff">
         <el-button type="primary" style="margin-bottom:20px" @click="dialogTableVisible=true">添加分类</el-button>
         <!-- 弹框 -->
         <el-dialog title="添加分类" :visible.sync="dialogTableVisible">
            <el-form >
                 <el-form-item label="分类名称" :label-width="formLabelWidth">
                     <el-input  autocomplete="off" v-model="f.category_name"></el-input>
                </el-form-item>
                <el-form-item label="父级区域" :label-width="formLabelWidth">
                    <div class="block">
                    <el-cascader
                        :options="Onecate"
                        :props="SetKesDept"
                        clearable
                        :show-all-levels="false"
                        v-model="form.id"
                        :key="refreshItem"
                       >
                    </el-cascader>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
            </div>
        </el-dialog>
         
         <el-table
            :data="Onecate"
            border
            row-key="_id"
            lazy
            style="width: 100%;font-size:12px"
            :tree-props="{children:'children'}"
            >
            <el-table-column
            type="indent"
            label="#"
            width="70"
           >
            </el-table-column>
            <el-table-column
            prop="category_name"
            label="分类名称"
            >
            </el-table-column>
            <el-table-column
            prop=""
            label="是否有效"
           >
           <i class="el-icon-success" style="color:#58bc58"></i>
            </el-table-column>
            <el-table-column
            label="分级">
            <template #default="{row}">
               <el-tag>{{row.scale}}</el-tag>
            </template>
            </el-table-column>
             <el-table-column
            label="操作">
            <template #default="{row}">
                 <el-button type="primary" size="mini" icon="el-icon-edit" @click="disl=row._id" style="margin-right:10px">编辑</el-button>
            <el-dialog title="修改分类" :visible="disl==row._id">
            <el-form>
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input  autocomplete="off" v-model="cate1"></el-input>
                </el-form-item>
               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="disl = false">取 消</el-button>
                <el-button type="primary" @click="change(row._id)">确 定</el-button>
            </div>
            </el-dialog>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="open(row._id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :page-sizes="[4, 6, 8, 10]"
            :page-size="size"
            @current-change="current_c"
            @size-change ="size_change"
            layout="sizes, prev, pager, next"
            :total="total" style="margin-top:10px">
        </el-pagination>
    </div>
</template>
<script>
    export default{
        inject:["reload"],
        data(){
            return{
                Onecate:[],
                disl:false,
                formLabelWidth: '120px',
                cate1:"",
                total:0,
                size:4,
                dialogTableVisible:false,
                formLabelWidth:"120px",
                SetKesDept:{
                    label:"category_name",
                    children:'children'
                },
                form:{
                    id:""
                },
                f:{
                    category_name:''
                },
                refreshItem:0,
            }
        },
        methods:{
            open(id){
                 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$store.dispatch("remove",{url:"/cate/remove",id});
                    this.reload()
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
            },
            change(id){
                this.$request.put("/cate/change",{
                    id,
                    category_name:this.cate1
                }).then(({data})=>{
                    if(data.code===200){
                        this.$message({
                            type:"success",
                            message:"修改成功"
                        })
                        this.reload()
                    }
                })
            },
            current_c(page){
                this.getCate(page-1,this.size);
            },
            getCate(page=0,limit=this.size){
                this.$request.get("/cate/all",{
                    params:{
                        skip:page*limit,
                        limit
                    }
                }).then(({data})=>{
                this.Onecate = data.data
                this.total = data.total
                console.log(this.Onecate);
                this.Onecate = this.Onecate.map(item=>{
                    this.form.id = item._id
                    //$set("要修改的对象"，"对象属性名","对象属性的值")
                    this.$set(item,"children",[]);
                    this.$request.get("/cate/allTwo",{
                        params:{
                            cate:item.category_name
                        }
                    }).then((res)=>{
                        res.data.data.map((d)=>{
                            if(item.category_name==d.cate){
                                item.children.push(d);
                            }
                        })
                    })
                    return item
                })
            })
            },
            size_change(size){
                this.size = size
                this.getCate(0,this.size)
            }
        },
        created(){
            this.getCate()
        }
    }
</script>