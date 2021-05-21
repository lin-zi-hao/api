<template>
    <div style="background:#ffffff;border:7px;">
        <div style="margin:15px 0 20px 0;padding:10px 0 0 10px;">
            <el-input placeholder="请输入内容" class="input-with-select" style="width:380px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="index" label="#" width="50">
            </el-table-column>
            <el-table-column prop="OrderID" label="订单编号">
            </el-table-column>
            <el-table-column prop="Orderprice" label="订单价格">
            </el-table-column>
            <el-table-column prop="tag" label="是否付款" width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.tag === '是' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="delivery" label="是否发货">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.delivery === '是' ? 'primary' : 'success'" disable-transitions>
                        {{scope.row.delivery}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="下单时间">
            </el-table-column>
            <el-table-column property="operation" label="操作" width="150">
                <template>
                    <el-tooltip class="item" effect="dark" content="编辑用户" placement="top">
                        <el-button size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="物流信息" placement="top">
                        <el-button size="mini" type="warning"><i class="el-icon-setting"></i></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

    export default {

        data() {
            return {
                tableData: [{
                    index: 1,
                    OrderID: "itcast-g7kmck725jaujgdts",
                    Orderprice: "40",
                    tag: "是",
                    delivery: "否",
                    time: "113243561"
                }]
            }
        }
    }
</script>