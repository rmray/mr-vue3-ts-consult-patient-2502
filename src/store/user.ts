import type { User } from '@/type/user'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 问题：user的TS类型有2个参数，const user: Ref<User | undefined, User | undefined>
  const user = ref<User>()

  function setUser(newVal: User) {
    user.value = newVal
  }
  function delUser() {
    user.value = undefined
  }

  return { user, setUser, delUser }
})
