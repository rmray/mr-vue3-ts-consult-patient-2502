<script setup lang="ts">
import { ConsultType } from '@/enum'
import { getConsultOrderId, getDiscount, getPayUrl } from '@/services/consult'
import { getPatientInfo } from '@/services/patient'
import { useConsultStore } from '@/store'
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/patient'
import { showConfirmDialog, showLoadingToast, showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const consultStore = useConsultStore()
const router = useRouter()

/** 同意协议 */
const isAgree = ref(false)

/** 立即支付，生成订单id，显示支付抽屉 */
const orderId = ref('')
async function onSubmit() {
  if (!isAgree.value) return showToast('请先同意支付协议')

  // 显示支付抽屉
  show.value = true

  // 生成订单id
  const res = await getConsultOrderId(consultStore.consult)
  console.log(res)
  orderId.value = res.data.id

  // 清空问诊记录信息
  consultStore.clear()
}

// 网络请求
onMounted(() => {
  loadDiscount() // 获取折扣信息
  loadPatientInfo() // 获取患者信息
})
/** 获取折扣信息 */
const discount = ref<ConsultOrderPreData>()
async function loadDiscount() {
  const res = await getDiscount({ type: ConsultType.Fast, illnessType: consultStore.consult.illnessType })
  discount.value = res.data

  // 保存优惠券ID
  consultStore.setCouponId(res.data.couponId || '')
}
/** 获取患者信息 */
const patientInfo = ref<Patient>()
async function loadPatientInfo() {
  // 验证是否选中患者信息
  if (!consultStore.consult.patientId) return showToast('请先选择患者信息')

  const res = await getPatientInfo(consultStore.consult.patientId)
  patientInfo.value = res.data
}

/** 支付抽屉 */
const show = ref(false)

/** 支付抽屉，监听列表项选中 */
const paymentMethod = ref<0 | 1>()

/** 阻止关闭抽屉 */
function onBeforeClose() {
  showConfirmDialog({
    title: '温馨提示',
    message: '确定要关闭支付吗？\n关闭后将无法获得医生回复。',
    confirmButtonText: '继续支付',
    cancelButtonText: '狠心离开'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      orderId.value = '' // 清空订单ID
      router.push('/consult')
      return true
    })
}

/** 立即支付，生成支付URL */
const payUrl = ref('')
async function onPaySubmit() {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')

  // 生成支付URL
  showLoadingToast({ message: '支付中...', duration: 0 }) // 显示加载中
  const res = await getPayUrl({
    paymentMethod: paymentMethod.value,
    orderId: orderId.value,
    payCallback: 'http://localhost:5174/room'
  })
  payUrl.value = res.data.payUrl

  // 后续处理
  window.location.href = payUrl.value // 跳转支付页面
  show.value = false // 关闭支付抽屉
}
</script>

<template>
  <div class="consult-pay" v-if="discount && patientInfo">
    <cp-nav-bar title="支付"></cp-nav-bar>

    <!-- 支付信息 -->
    <div class="pay-info">
      <p class="tit">图文问诊 {{ discount?.payment }} 元</p>
      <img src="@/assets/images/avatar-doctor.svg" class="img" />
      <p class="desc">
        <span>急速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>

    <!-- 折扣信息 -->
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${discount?.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${discount?.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${discount?.actualPayment}`" class="pay-price" />
    </van-cell-group>

    <div class="pay-space"></div>

    <!-- 患者信息 -->
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patientInfo?.name} | ${patientInfo?.genderValue} | ${patientInfo?.age}岁`"
      />
      <van-cell title="病情描述" :label="consultStore.consult.illnessDesc" />
    </van-cell-group>

    <!-- 同意协议 -->
    <van-checkbox class="pay-schema" v-model="isAgree">我已同意 <span class="text">支付协议</span></van-checkbox>

    <!-- 立即支付 -->
    <van-submit-bar
      button-type="primary"
      text-align="left"
      :price="discount?.actualPayment ? discount.actualPayment * 100 : 0"
      button-text="立即支付"
      @submit="onSubmit"
    />
  </div>

  <!-- 骨架屏 -->
  <div class="consult-pay" v-else>
    <cp-nav-bar title="支付"></cp-nav-bar>
    <van-skeleton title :row="10" style="margin-top: 20px" />
  </div>

  <!-- 支付抽屉 -->
  <van-action-sheet
    class="pay-type"
    v-model:show="show"
    :close-on-popstate="false"
    :closeable="false"
    title="选择支付方式"
    :before-close="onBeforeClose"
  >
    <p class="amount">¥ 39.00</p>
    <van-cell-group>
      <van-cell title="微信支付" @click="paymentMethod = 0">
        <template #icon>
          <cp-icon name="consult-wechat"></cp-icon>
        </template>
        <template #extra>
          <van-checkbox :checked="paymentMethod === 0" disabled></van-checkbox>
        </template>
      </van-cell>
      <van-cell title="支付宝支付" @click="paymentMethod = 1">
        <template #icon>
          <cp-icon name="consult-alipay"></cp-icon>
        </template>
        <template #extra>
          <van-checkbox :checked="paymentMethod === 1"></van-checkbox>
        </template>
      </van-cell>
      <div class="btn"><van-button type="primary" round block @click="onPaySubmit">立即支付</van-button></div>
    </van-cell-group>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.consult-pay {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
