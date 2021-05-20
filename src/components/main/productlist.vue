<template>
    <div style="background:#ffffff;border:7px;">
        <div style="margin:15px 0 20px 0;padding:10px 0 0 10px;">
            <el-input placeholder="请输入内容" class="input-with-select" style="width:380px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" style="margin-left:30px" @click="dialogFormVisible = true">添加商品</el-button>
        </div>
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%;padding:0 10px 0 10px;"
            fit>
                <el-table-column type="index" label="#">
                </el-table-column>
                <el-table-column property="goods_name" label="商品名称" width="400">
                </el-table-column>
                <el-table-column property="goods_price" label="价格(元)">
                </el-table-column>
                <el-table-column property="goods_num" label="商品数量">
                </el-table-column>
                <el-table-column property="goods_wei" label="商品重量">
                </el-table-column>
                <el-table-column property="date" label="创建时间">
                </el-table-column>
                <el-table-column property="operation" label="操作" width="150">
                    <el-button size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
                    <el-button size="mini" type="danger" @click="open"><i class="el-icon-delete"></i>
                    </el-button>
                </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[4, 6, 8, 10]" :page-size="size" style="padding:20px"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="pageSize"
                @current-change="currentPage">
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
                tableData: [],
                total: 0,
                currentRow: null,
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                size: 4,
            }
        },
        // y表示页码  l表示数据的数量
        // skip 0*5=0
        // l:5
        //skip:1*5=5 l:5
        //skip:2*5=10 l:5
        methods: {
            getData(y, l) {
                this.$request.get("/goods/all", {
                    params: {
                        skip: y * l,
                        limit: l
                    }
                }).then(({
                    data
                }) => {
                    console.log(data);
                    this.total = data.total
                    this.tableData = data.data
                    this.id = data._id
                })
            },
            pageSize(l) {
                this.size = l
                this.getData(0, this.size)
            },
            currentPage(y) {
                this.getData(y - 1, this.size)
            },
        },
        created() {
            this.getData(0, this.size)
        }
    }
</script>