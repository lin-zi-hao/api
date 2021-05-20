<template>
    <div style="padding:20px;background:#fff">
        <div style="margin-top: 15px;margin-bottom:20px">
        <el-input placeholder="请输入内容" class="input-with-select" style="width:500px">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        </div>
        <el-table
            border
            style="width: 100%;font-size:12px">
            <el-table-column
            label="#"
            width="70">
            </el-table-column>
            <el-table-column
            label="订单编号"
            width="256">
            </el-table-column>
            <el-table-column
            label="订单价格"
            width="256">
            </el-table-column>
            <el-table-column
            label="是否付款"
            width="256">
            </el-table-column>
            <el-table-column
            label="是否发货"
            width="256">
            </el-table-column>
            <el-table-column
            label="下单时间"
            width="256">
            </el-table-column>
            <el-table-column
            label="下单操作"
            width="256">
                <template>
                    <el-button type="primary" icon="el-icon-edit" size="mini"> 
                    </el-button>
                    <el-button type="primary" icon="el-icon-location-outline" size="mini">主要按钮</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                totalData:[]
            }
        }
    }
</script>