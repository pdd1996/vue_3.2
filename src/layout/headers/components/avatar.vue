<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="50" :src="circleUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const circleUrl = ref(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const logout = () => {
  store.dispatch('app/logout')
}
</script>

<style scoped>
::v-deep .el-dropdown-menu__item {
  white-space: nowrap;
}
</style>
