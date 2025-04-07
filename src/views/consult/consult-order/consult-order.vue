<script setup lang="ts">
import { ref } from 'vue'
import ConsultOrderList from './cpns/consult-order-list/consult-order-list.vue'
import { ConsultType } from '@/enum'

const active = ref(0)
</script>

<template>
  <div class="consult-order">
    <cp-nav-bar title="问诊记录"></cp-nav-bar>

    <van-tabs v-model:active="active" sticky>
      <van-tab title="急速问诊"><consult-order-list :type="ConsultType.Fast" /></van-tab>
      <van-tab title="找医生"><consult-order-list :type="ConsultType.Doctor" /></van-tab>
      <van-tab title="开药问诊"><consult-order-list :type="ConsultType.Medication" /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.consult-order {
  padding-top: 46px;
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
</style>
