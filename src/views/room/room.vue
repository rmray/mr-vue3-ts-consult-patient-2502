<script setup lang="ts">
import RoomStatus from './cpns/room-status/room-status.vue'
import RoomMessage from './cpns/room-message/room-message.vue'
import RoomAction from './cpns/room-action/room-action.vue'
import { nextTick, onMounted, onUnmounted, provide, ref, watchEffect } from 'vue'
import { io, type Socket } from 'socket.io-client'
import { BASE_URL } from '@/utils/request/config'
import { localCache } from '@/utils/cache'
import { useRoute, useRouter } from 'vue-router'
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '@/enum'
import { getConsultOrderDetail } from '@/services/consult'
import type { ConsultOrderItem, Image } from '@/types/consult'
import { useUserStore } from '@/store'
import dayjs from 'dayjs'
import { showToast } from 'vant'

// 钩子函数
let socket: Socket
const router = useRouter()
const msgList = ref<Message[]>([])
const isInitial = ref(true)
onMounted(() => {
  // 创建socket实例
  socket = io(BASE_URL, {
    auth: {
      token: 'Bearer ' + localCache.getItem('user')?.user?.token || ''
    },
    query: {
      orderId: router.currentRoute.value.query.orderId
    }
  })
  socket.on('connect', () => console.log('连接成功')) // 监听连接
  socket.on('disconnect', () => console.log('连接断开')) // 监听断开连接
  socket.on('error', (err) => console.log('连接出错：', err)) // 监听错误

  // 监听历史消息记录
  socket.on('chatMsgList', async ({ data }: { data: TimeMessages[] }) => {
    const list: Message[] = []
    // 生成时间通知消息
    data.forEach((item) => {
      list.push({
        id: item.createTime,
        msgType: MsgType.Notify,
        createTime: item.createTime,
        msg: { content: item.createTime }
      })
      list.push(...item.items)
    })
    msgList.value.unshift(...list)

    // 滚动到底部
    if (isInitial.value) {
      // 设置消息已读
      socket.emit('updateMsgStatus', list[list.length - 1].id)

      await nextTick()
      window.scrollTo(0, document.body.scrollHeight)
      isInitial.value = false
    }

    // 没有更多
    loading.value = false
    if (!list.length) return showToast('没有更多消息了...')
  })

  // 订单状态变化时，获取问诊订单详情
  socket.on('statusChange', () => loadConsultOrderDetail())

  // 监听聊天消息
  socket.on('receiveChatMsg', async (event) => {
    // 消息已读
    socket.emit('updateMsgStatus', event.id)

    // console.log(event)
    msgList.value.push(event)

    // 滚动到底部
    await nextTick()
    window.scrollTo({ left: 0, top: document.body.scrollHeight })
  })

  // 初始化时，获取问诊订单详情
  loadConsultOrderDetail()
})
onUnmounted(() => {
  socket.close() // 断开连接
})
/** msgList按时间排序 */
watchEffect(() => {
  msgList.value.sort((a, b) => {
    return dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf()
  })
})

// 网络请求，获取问诊订单详情
const route = useRoute()
const consultOrder = ref<ConsultOrderItem>()
async function loadConsultOrderDetail() {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  // console.log('consultOrder: ', res)
  consultOrder.value = res.data
  // console.log(consultOrder.value)
}

/** 监听发送文字消息 */
const userStore = useUserStore()
function onSendText(text: string) {
  socket.emit('sendChatMsg', {
    from: userStore.user?.id,
    to: consultOrder.value?.docInfo.id,
    msgType: MsgType.MsgText,
    msg: { content: text }
  })
}

/** 监听发送图片消息 */
function onSendImage(img: Image) {
  socket.emit('sendChatMsg', {
    from: userStore.user?.id,
    to: consultOrder.value?.docInfo.id,
    msgType: MsgType.MsgImage,
    msg: { picture: img }
  })
}

/** 下拉刷新 */
const loading = ref(false)
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
function onRefresh() {
  // console.log('下拉刷新')
  // 加载更多消息
  socket.emit('getChatMsgList', 5, msgList.value[0].createTime || time.value, route.query.orderId)
}

/** 传递数据给子孙组件 */
provide('consultOrder', consultOrder)
provide('loadConsultOrderDetail', loadConsultOrderDetail)
</script>

<template>
  <div class="room">
    <cp-nav-bar title="问诊室"></cp-nav-bar>

    <room-status v-if="consultOrder" :status="consultOrder?.status" :countdown="consultOrder?.countdown"></room-status>

    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <template v-for="msg in msgList" :key="msg.id">
        <room-message :msg="msg"></room-message>
      </template>
    </van-pull-refresh>
    <room-action
      v-if="consultOrder"
      :status="consultOrder?.status"
      @send-text="onSendText"
      @send-image="onSendImage"
    ></room-action>
  </div>
</template>

<style lang="scss" scoped>
.room {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
