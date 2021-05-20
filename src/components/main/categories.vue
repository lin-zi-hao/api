<template>
    <div style="padding:20px;background:#fff">
         <el-button type="primary" style="margin-bottom:20px">添加分类</el-button>
         <el-table
            border
            style="width: 100%;font-size:12px">
            <el-table-column
            label="#"
            width="70">
            </el-table-column>
            <el-table-column
            label="分类名称"
            >
            </el-table-column>
            <el-table-column
           
            label="是否有效"
           >
            </el-table-column>
            <el-table-column
            label="分级">
            </el-table-column>
             <el-table-column
            label="操作">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>