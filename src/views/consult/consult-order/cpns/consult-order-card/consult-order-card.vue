<script setup lang="ts">
import { ConsultOrderStatus } from '@/enum'
import { useShowPrescription } from '@/hooks/consult'
import { cancelConsultOrder, deleteConsultOrder } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { showFailToast } from 'vant'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  item: ConsultOrderItem
}>()
const emit = defineEmits<{
  (e: 'cancel-order', id: string): void
  (e: 'delete-order', id: string): void
}>()

const router = useRouter()

/** 气泡配置 */
const showPopover = ref(false)
const actions = computed(() => [{ text: '查看处方', disabled: !props.item.prescriptionId }, { text: '删除订单' }])
function onSelect(action: { text: string; disabled: boolean }, index: number) {
  if (index === 1) {
    // 删除订单
    onDeleteConsultOrder()
  } else if (index === 0) {
    // 查看处方
    onShowPrescription(props.item.prescriptionId)
  }
}

/** 取消问诊 */
const cancelLoading = ref(false)
async function onCancelConsultOrder() {
  try {
    cancelLoading.value = true
    await cancelConsultOrder(props.item.id)
    emit('cancel-order', props.item.id)
  } catch (err) {
    showFailToast('取消问诊失败')
  } finally {
    cancelLoading.value = false
  }
}

/** 删除订单 */
const deleteLoading = ref(false)
async function onDeleteConsultOrder() {
  try {
    deleteLoading.value = true
    const res = await deleteConsultOrder(props.item.id)
    console.log('删除订单: ', res)
    emit('delete-order', props.item.id)
  } catch (err) {
    showFailToast('删除订单失败')
  } finally {
    deleteLoading.value = false
  }
}

/** 查看处方 */
const { onShowPrescription } = useShowPrescription()
</script>

<template>
  <div class="consult-order-card">
    <div class="head">
      <img class="img" src="@/assets/images/avatar-doctor.svg" />
      <p>{{ item.docInfo.name }}</p>
      <span
        :class="{
          green: item.status === ConsultOrderStatus.ConsultChating,
          orange: item.status === ConsultOrderStatus.ConsultUnpaid
        }"
      >
        {{ item.statusValue }}
      </span>
    </div>
    <div class="body" @click="router.push(`/consult/order/${item.id}`)">
      <div class="body-row">
        <span class="body-label">病情描述</span>
        <span class="body-value">{{ item.illnessDesc }}</span>
      </div>
      <div class="body-row">
        <span class="body-label">价格</span>
        <span class="body-value">¥ {{ item.payment.toFixed(2) }}</span>
      </div>
      <div class="body-row">
        <span class="body-label">创建时间</span>
        <span class="body-value tip">{{ item.createTime }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="foot" v-if="item.status === ConsultOrderStatus.ConsultUnpaid">
      <van-button class="gray" size="small" round plain @click="onCancelConsultOrder" :loading="cancelLoading">
        取消问诊
      </van-button>
      <van-button type="primary" size="small" round plain :to="`/consult/order/${item.id}`">去支付</van-button>
    </div>
    <div class="foot" v-if="item.status === ConsultOrderStatus.ConsultChatFinished">
      <div class="more">
        <van-popover :actions="actions" v-model:show="showPopover" placement="top-start" @select="onSelect">
          <template #reference>...</template>
        </van-popover>
      </div>
      <van-button class="gray" size="small" round plain :to="`/room?orderId=${item.id}`">问诊记录</van-button>
      <van-button type="primary" size="small" round plain>写评价【</van-button>
    </div>
    <div class="foot" v-if="item.status === ConsultOrderStatus.ConsultChating">
      <van-button
        v-if="item.prescriptionId"
        class="gray"
        size="small"
        round
        plain
        @click="onShowPrescription(item.prescriptionId)"
      >
        查看处方
      </van-button>
      <van-button type="primary" size="small" round plain :to="`/room?orderId=${item.id}`">继续沟通</van-button>
    </div>
    <div class="foot" v-if="item.status === ConsultOrderStatus.ConsultChatWaiting">
      <van-button class="gray" size="small" round plain @click="onCancelConsultOrder" :loading="cancelLoading">
        取消问诊
      </van-button>
      <van-button type="primary" size="small" round plain :to="`/room?orderId=${item.id}`">继续沟通</van-button>
    </div>
    <div class="foot" v-if="item.status === ConsultOrderStatus.ConsultChatCanceled">
      <van-button class="gray" size="small" round plain @click="onDeleteConsultOrder">删除订单</van-button>
      <van-button type="primary" size="small" round plain>咨询其他医生【</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-order-card {
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  margin-bottom: 10px;
  .head {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    .img {
      width: 20px;
      height: 20px;
    }
    > p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }
    > span {
      color: var(--cp-tag);
      &.orange {
        color: #f2994a;
      }
      &.green {
        color: var(--cp-primary);
      }
    }
  }
  .body {
    padding: 15px 15px 8px 15px;
    .body-row {
      display: flex;
      margin-bottom: 7px;
    }
    .body-label {
      width: 62px;
      font-size: 13px;
      color: var(--cp-tip);
    }
    .body-value {
      width: 250px;
      &.tip {
        color: var(--cp-tip);
      }
    }
  }
  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }
    .more {
      color: var(--cp-tag);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>
