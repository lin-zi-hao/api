<template>
    <div style="background:#ffffff;border:7px;">
        <div style="margin:15px 0 20px 0;padding:10px 0 0 10px;">
            <el-input placeholder="请输入内容" class="input-with-select" style="width:380px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" style="margin-left:30px" @click="dialogFormVisible = true">添加商品</el-button>
        </div>
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%;padding:0 10px 0 10px;" fit>
            <el-table-column type="index" label="#">
            </el-table-column>
            <el-table-column property="commodity" label="商品名称" width="400">
            </el-table-column>
            <el-table-column property="price" label="价格(元)">
            </el-table-column>
            <el-table-column property="quantity" label="商品数量">
            </el-table-column>
            <el-table-column property="weight" label="商品重量">
            </el-table-column>
            <el-table-column property="createdate" label="创建时间">
            </el-table-column>
            <el-table-column property="operation" label="操作" width="150">
                <el-button size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
                <el-button size="mini" type="danger"><i class="el-icon-delete"></i>
                </el-button>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[4, 6, 8, 10]" :page-size="30" style="padding:20px"
                layout="total, sizes, prev, pager, next, jumper" :total="30">
            </el-pagination>
        </div>

        <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
            <el-form label-width="80px">
                1111
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [{
                    index: 1,
                    commodity: "【海外购自营】黎珐(ReFa) MTG日本 CARAT铂金微电流瘦脸瘦身提拉紧致V脸美容仪 【保税仓发货】",
                    price:1399,
                    quantity:100,
                    weight:400,
                    createdate:"2017-12-03 11:31:17",
                }],
                currentRow: null,
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
            }
        },

        methods: {

        },
        created() {

        }
    }
</script>