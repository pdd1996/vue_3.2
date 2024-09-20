<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          v-model="queryForm.query"
          placeholder="请输入搜索的用户的名字"
          clearable
        />
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUsersList"
        >搜索</el-button
      >
      <el-button type="primary">添加用户</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        v-for="(item, index) in options"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" />
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          <!-- <el-switch v-model="row.mg_state" /> -->
          {{ $filters.filterTimes(row.create_time) }}
        </template>
        <template #default v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit">编辑</el-button>
          <el-button type="warning" size="small" :icon="Setting"
            >设置</el-button
          >
          <el-button type="danger" size="small" :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      :page-sizes="[1, 5, 10, 15]"
      :page-size="queryForm.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { Edit, Search, Setting, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUsers } from '@/api/users'
import { options } from './options'

const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})

const total = ref(0)

const tableData = ref([])

const initGetUsersList = async () => {
  const res = await getUsers(queryForm.value)
  total.value = res.total
  tableData.value = res.users
}

initGetUsersList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUsersList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUsersList()
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-input__suffix {
  align-items: center;
}
</style>
