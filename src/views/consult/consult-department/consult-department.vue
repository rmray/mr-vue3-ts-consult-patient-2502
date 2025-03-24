<script setup lang="ts">
import { getAllDepartment } from '@/services/consult'
import { useConsultStore } from '@/store'
import type { Department, SubDepartment } from '@/types/consult'
import { onMounted, ref } from 'vue'

// store
const consultStore = useConsultStore()

/** 侧边导航 */
const active = ref(0)

// 钩子函数
onMounted(async () => {
  await loadAllDeparment() // 获取所有科室列表
  onItemClick(departments.value[active.value]) // 默认选中第一个科室
})

// 网络请求
/** 获取所有科室列表 */
const departments = ref<Department[]>([])
async function loadAllDeparment() {
  const res = await getAllDepartment()

  departments.value = res.data
}

// 事件处理
/** 根据一级科室id获取对应的二级科室列表 */
const subDepartments = ref<SubDepartment[]>([])
function onItemClick(item: Department) {
  subDepartments.value = departments.value.find((dep) => dep.id === item.id)?.child || []
}
</script>

<template>
  <div class="consult-department">
    <cp-nav-bar title="选择科室"></cp-nav-bar>

    <div class="wrapper">
      <!-- 一级科室 -->
      <van-sidebar v-model="active">
        <template v-for="dep in departments" :key="dep.id">
          <van-sidebar-item :title="dep.name" @click="onItemClick(dep)" />
        </template>
      </van-sidebar>

      <!-- 二级科室 -->
      <div class="sub-dep">
        <template v-for="sub in subDepartments" :key="sub.id">
          <router-link to="/consult/illness" @click="consultStore.setDepId(sub.id)">{{ sub.name }}</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-department {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>
