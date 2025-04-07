<script setup lang="ts">
import { ref } from 'vue'
import ConsultOrderCard from '../consult-order-card/consult-order-card.vue'
import type { ConsultOrderItem } from '@/types/consult'
import { ConsultOrderStatus, type ConsultType } from '@/enum'
import { getConsultOrderList } from '@/services/consult'
import { showSuccessToast } from 'vant'

const props = defineProps<{
  type: ConsultType
}>()

/** 下拉加载更多 */
const loading = ref(false)
const finished = ref(false)
const orderList = ref<ConsultOrderItem[]>([])

/** 初始网络请求 */
const current = ref(1)
const pageSize = ref(5)
let isRequest = false
async function onLoad() {
  if (finished.value || loading.value || isRequest) return
  isRequest = true

  const res = await getConsultOrderList({ current: current.value, pageSize: pageSize.value, type: props.type })
  console.log('触发onLoad事件', current.value, loading.value)
  orderList.value.push(...res.data.rows)

  if (current.value < res.data.pageTotal) {
    current.value++
  } else {
    finished.value = true
  }

  loading.value = false
  isRequest = false
}

/** 监听取消订单事件 */
function onCancelOrder(id: string) {
  // console.log(id)
  const item = orderList.value.find((item) => item.id === id)
  if (item) {
    item.status = ConsultOrderStatus.ConsultChatCanceled
    item.statusValue = '已取消'
    showSuccessToast('取消问诊成功')
  }
}

/** 监听删除订单事件 */
function onDeleteOrder(id: string) {
  orderList.value = orderList.value.filter((item) => item.id !== id)
  showSuccessToast('删除问诊订单成功')

  // 如果问诊订单列表没有数据了，则加载新数据
  if (!orderList.value.length) onLoad()
}
</script>

<template>
  <div class="consult-order-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <template v-for="item in orderList" :key="item.id">
        <consult-order-card :item="item" @cancel-order="onCancelOrder" @delete-order="onDeleteOrder" />
      </template>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-order-list {
  color: inherit;
}
</style>
