<script setup lang="ts">
import { userLoginByPassword } from './services/user'
import { useUserStore } from './store'

const userStore = useUserStore()

/** 测试store */
function hdlSetUser() {
  userStore.setUser({
    token: 'token',
    id: '123',
    account: 'tom',
    mobile: '13211112222',
    avatar: 'head',
    refreshToken: 'refreshToken'
  })
}
function hdlDelUser() {
  userStore.delUser()
}

/** 用户登录 */
function hdlLogin() {
  userLoginByPassword({
    mobile: '13211112222',
    password: 'abc12345'
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="app">
    <van-button @click="hdlSetUser" size="small">添加用户</van-button>
    <van-button @click="hdlDelUser" size="small">删除用户</van-button>
    {{ userStore.user }}
    <hr />

    <van-button @click="hdlLogin" size="small" type="primary">登录</van-button>
  </div>
</template>

<style lang="scss" scoped>
.app {
  color: inherit;
}
</style>
