<template>
    <div style="background:#ffffff;border:7px;">
        <div style="margin:15px 0 20px 0;padding:10px 0 0 10px;">
            <el-input placeholder="请输入内容" class="input-with-select" style="width:380px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" style="margin-left:30px" @click="dialogTableVisible = true">添加用户</el-button>
        </div>
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%;padding:0 10px 0 10px;">
            <el-table-column type="index" label="#" width="50">
            </el-table-column>
            <el-table-column property="username" label="姓名" width="100">
            </el-table-column>
            <el-table-column property="email" label="邮箱" width="170">
            </el-table-column>
            <el-table-column property="phone" label="电话" width="170">
            </el-table-column>
            <el-table-column property="role" label="角色" width="170">
            </el-table-column>
            <el-table-column property="state" label="状态" width="120">
                <template v-slot:default="{row}">
                    <el-switch v-model="row.value" @change="changeswitch">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column property="operation" label="操作" width="200">
                <template>
                    <el-button size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
                    <el-button size="mini" type="warning"><i class="el-icon-setting"></i></el-button>
                    <el-button size="mini" type="danger"><i class="el-icon-delete"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[4, 6, 8, 10]" :page-size="30" style="padding:20px"
                layout="total, sizes, prev, pager, next, jumper" :total="30">
            </el-pagination>
        </div>

        <el-dialog title="收货地址">
            <el-form :model="form">
                <el-form-item label="活动名称">
                    <el-input autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>


        <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           
        </el-form> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // value: true,
                tableData: [],
                currentRow: null,
                dialogTableVisible: false,
                dialogFormVisible: false,
            }
        },

        methods: {
            changeswitch() {
                this.$message({
                    message: '更新用户状态成功',
                    type: 'success'
                });
            },



        },
        created() {
            this.$request.get("/user/all").then(({
                data
            }) => {
                console.log(data.data);
                this.tableData = data.data.map((item, index) => {
                    item.role = "超级管理员";
                    item.value = `value${index+1}`;
                    return item
                });
            })
        }
    }
</script>