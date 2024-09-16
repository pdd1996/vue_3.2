<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
  >
    <el-sub-menu
      :index="item.id"
      v-for="(item, index) in menusList"
      :key="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]" />
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + it.path"
        v-for="it in item.children"
        :key="it.id"
        @click="savePath(path)"
      >
        <template #title>
          <el-icon>
            <component :is="icon" />
          </el-icon>
          <span>{{ it.authName }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
// import variables from '@/styles/variables.scss'
//     :active-text-color="variables.menuActiveText"
//     :background-color="variables.menuBg"

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')
const defaultActive = ref(sessionStorage.getItem('path') || '/users')

const menusList = ref([])
const initMenuList = async () => {
  menusList.value = await menuList()
}

initMenuList()

const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}
</script>

<style scoped></style>
