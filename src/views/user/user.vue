<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserProfile from './cpns/user-profile/user-profile.vue'
import { getUserInfo } from '@/services/user'
import type { UserInfo } from '@/types/user'

onMounted(() => {
  loadUserInfo()
})

// 网络请求
const userInfo = ref<UserInfo>()
async function loadUserInfo() {
  const res = await getUserInfo()
  // console.log('res: ', res)
  userInfo.value = res.data
}

// 快捷工具数据
const tools = [
  { label: '我的问诊', path: '/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/patient' },
  { label: '地址管理', path: '/' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]
</script>

<template>
  <div class="user">
    <user-profile v-if="userInfo" :user-info="userInfo" :tools="tools" />
  </div>
</template>

<style lang="scss" scoped>
.user {
  color: inherit;
}
</style>
