<template>
    <div style="padding:20px;background:#fff">
       <div class="block">
        <span class="demonstration">选择商品分类：</span>
        <el-cascader
            :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                sel:[
                    {

                    }
                ]
            }
        }
    }
</script>