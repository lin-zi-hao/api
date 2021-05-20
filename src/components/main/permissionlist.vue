<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="#" width="50">
        </el-table-column>
        <el-table-column prop="authority" label="权限名称">
        </el-table-column>
        <el-table-column prop="way" label="路径">
        </el-table-column>
        <el-table-column prop="tag" label="标签" width="100"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}
                </el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [{
                    index: 1,
                    authority: "商品管理",
                    way: "goods",
                    tag: "一级"
                }]
            }
        }
    }
</script>