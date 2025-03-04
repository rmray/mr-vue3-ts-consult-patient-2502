<script setup lang="ts">
import { useUserStore } from './store'

const userStore = useUserStore()

function hdlSetUser() {
  userStore.setUser({
    token: 'token',
    id: '123',
    account: 'tom',
    mobile: '13222221111',
    avatar: 'head'
  })
}
function hdlDelUser() {
  userStore.delUser()
}
</script>

<template>
  <div class="app">
    <van-button @click="hdlSetUser" size="small">添加用户</van-button>
    <van-button @click="hdlDelUser" size="small">删除用户</van-button>
    <hr />
    {{ userStore.user }}
    <hr />
  </div>
</template>

<style lang="scss" scoped>
.app {
  color: inherit;
}
</style>
