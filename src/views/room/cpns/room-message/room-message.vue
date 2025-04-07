<script setup lang="ts">
import type { IllnessTime } from '@/enum'
import type { Message } from '@/types/room'
import type { Image } from '@/types/consult'

import dayjs from 'dayjs'
import { showImagePreview, showToast } from 'vant'
import { MsgType } from '@/enum'
import { consultFlagOptions, illnessTimeOptions } from '@/constance'
import { useUserStore } from '@/store'
import { getPrescription } from '@/services/consult'
import EvaluateCard from '../evaluate-card/evaluate-card.vue'
import { useShowPrescription } from '@/hooks/consult'

defineProps<{
  msg: Message
}>()

/** 渲染数据 */
function getIllnessTimeText(time: IllnessTime) {
  return illnessTimeOptions.find((item) => item.value === time)?.label
}
function getConsultFlagText(flag: 0 | 1) {
  return consultFlagOptions.find((item) => item.value === flag)?.label
}
function onImagePreview(pictrues: Image[]) {
  if (pictrues && pictrues.length) {
    showImagePreview(pictrues.map((pic) => pic.url))
  } else {
    showToast('暂无图片')
  }
}

/** store */
const userStore = useUserStore()

/** 格式化时间 */
function formatTime(time: string) {
  return dayjs(time).format('HH:mm')
}

/** 显示原始处方 */
const { onShowPrescription } = useShowPrescription()
</script>

<template>
  <div class="room-message">
    <!-- 患者卡片 -->
    <div class="msg msg-illness" v-if="msg.msgType === MsgType.CardPatient">
      <div class="patient van-hairline-bottom">
        <p>
          {{ msg.msg.consultRecord?.patientInfo.name }}
          {{ msg.msg.consultRecord?.patientInfo.genderValue }}
          {{ msg.msg.consultRecord?.patientInfo.age }}岁
        </p>
        <p v-if="msg.msg.consultRecord">
          {{ getIllnessTimeText(msg.msg.consultRecord?.illnessTime) }} |
          {{ getConsultFlagText(msg.msg.consultRecord.consultFlag) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ msg.msg.consultRecord?.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col span="18" v-if="msg.msg.consultRecord" @click="onImagePreview(msg.msg.consultRecord?.pictures)">
          点击查看
        </van-col>
      </van-row>
    </div>

    <!-- 通知-通用 -->
    <div class="msg msg-tip" v-if="msg.msgType === MsgType.Notify">
      <div class="content">
        <span>{{ msg.msg.content }}</span>
      </div>
    </div>

    <!-- 通知-温馨提示 -->
    <div class="msg msg-tip" v-if="msg.msgType === MsgType.NotifyTip">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>{{ msg.msg.content }}</span>
      </div>
    </div>

    <!-- 通知-结束 -->
    <div class="msg msg-tip msg-tip-cancel" v-if="msg.msgType === MsgType.NotifyCancel">
      <div class="content">
        <span>订单取消</span>
      </div>
    </div>

    <!-- 发送文字 -->
    <div class="msg msg-to" v-if="msg.msgType === MsgType.MsgText && msg.from === userStore.user?.id">
      <div class="content">
        <div class="time">{{ formatTime(msg.createTime) }}</div>
        <div class="pao">{{ msg.msg.content }}</div>
      </div>
      <van-image :src="msg.fromAvatar" />
    </div>

    <!-- 发送图片 -->
    <div class="msg msg-to" v-if="msg.msgType === MsgType.MsgImage && msg.from === userStore.user?.id">
      <div class="content">
        <div class="time">{{ formatTime(msg.createTime) }}</div>
        <van-image :src="msg.msg.picture?.url" fit="contain" />
      </div>
      <van-image :src="msg.fromAvatar" />
    </div>

    <!-- 接收文字 -->
    <div class="msg msg-from" v-if="msg.msgType === MsgType.MsgText && msg.from !== userStore.user?.id">
      <van-image :src="msg.fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(msg.createTime) }}</div>
        <div class="pao">{{ msg.msg.content }}</div>
      </div>
    </div>

    <!-- 接收图片 -->
    <div class="msg msg-from" v-if="msg.msgType === MsgType.MsgImage && msg.from !== userStore.user?.id">
      <van-image :src="msg.fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(msg.createTime) }}</div>
        <van-image :src="msg.msg.picture?.url" fit="contain" />
      </div>
    </div>

    <!-- 处方卡片 -->
    <div class="msg msg-recipe" v-if="msg.msgType === MsgType.CardPrescription">
      <div class="content">
        <div class="head">
          <div class="head-tit">
            <h3>电子处方</h3>
            <p @click="onShowPrescription(msg.msg.prescription?.id)">
              原始处方
              <van-icon name="arrow" />
            </p>
          </div>
          <p>
            {{ msg.msg.prescription?.name }} {{ msg.msg.prescription?.genderValue }} {{ msg.msg.prescription?.age }}岁
            {{ msg.msg.prescription?.diagnosis }}
          </p>
          <p>开方时间: {{ msg.msg.prescription?.createTime }}</p>
        </div>
        <div class="body">
          <template v-for="med in msg.msg.prescription?.medicines" :key="med.id">
            <div class="body-item">
              <div class="durg">
                <p>{{ med.name }}</p>
                <!-- <p>{{ med.specs }}</p> -->
                <p>{{ med.usageDosag }}</p>
              </div>
              <div class="num">x{{ med.quantity }}</div>
            </div>
          </template>
        </div>
        <div class="foot">
          <span>购买药品</span>
        </div>
      </div>
    </div>

    <!-- 评价卡片 -->
    <div
      class="msg msg-comment"
      v-if="msg.msgType === MsgType.CardUnevaluated || msg.msgType === MsgType.CardEvaluated"
    >
      <evaluate-card :evaluateDoc="msg.msg.evaluateDoc"></evaluate-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.msg {
  display: flex;
  padding: 15px;
  // 医生消息+图片
  &-from {
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--cp-tip);
        margin-bottom: 5px;
      }
      .pao {
        padding: 15px;
        background-color: #fff;
        color: var(--cp-text3);
        font-size: 15px;
        border-radius: 8px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background: #fff;
          border-top-left-radius: 13px 3px;
        }
        &::after {
          content: '';
          position: absolute;
          left: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--cp-bg);
          border-top-right-radius: 13px 13px;
        }
      }
      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--cp-line);
      }
    }
    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 13px;
    }
  }
  // 患者消息+图片
  &-to {
    justify-content: flex-end;
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--cp-tip);
        margin-bottom: 5px;
        text-align: right;
      }
      .pao {
        padding: 15px;
        background-color: var(--cp-primary);
        color: #fff;
        font-size: 15px;
        border-radius: 8px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          right: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background: var(--cp-primary);
          border-top-right-radius: 13px 3px;
        }
        &::after {
          content: '';
          position: absolute;
          right: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--cp-bg);
          border-top-left-radius: 13px 13px;
        }
      }
      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--cp-line);
      }
    }
    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 13px;
    }
  }
  &-tip {
    justify-content: center;
    font-size: 12px;
    .content {
      height: 34px;
      line-height: 34px;
      background-color: #fff;
      color: var(--cp-tip);
      font-size: 12px;
      border-radius: 17px;
      padding: 0 16px;
      max-width: 100%;
      .green {
        color: var(--cp-primary);
      }
    }
    &-cancel {
      .content {
        background-color: #ededed;
      }
    }
  }
  &-illness {
    display: block;
    background-color: #fff;
    margin: 15px;
    border-radius: 8px;
    font-size: 12px;
    .patient {
      padding-bottom: 15px;
      margin-bottom: 15px;
      > p {
        &:first-child {
          font-size: 16px;
        }
        &:last-child {
          margin-top: 5px;
          color: var(--cp-tip);
        }
      }
    }
    .van-col {
      &:nth-child(-n + 2) {
        margin-bottom: 5px;
      }
      &:nth-child(2n) {
        color: var(--cp-tip);
      }
      &:nth-child(2n-1) {
        font-weight: bold;
      }
    }
  }
  &-recipe {
    padding: 15px;
    .content {
      background-color: #fff;
      border-radius: 8px;
      color: var(--cp-tip);
      font-size: 12px;
      flex: 1;
      .head {
        padding: 15px;
        .head-tit {
          display: flex;
          justify-content: space-between;
          > h3 {
            font-weight: normal;
            font-size: 16px;
            color: var(--cp-text1);
          }
        }
        p {
          margin-top: 5px;
        }
      }
      .body {
        padding: 15px 15px 0 15px;
        &-item {
          display: flex;
          margin-bottom: 15px;
          .durg {
            flex: 1;
            > p {
              &:first-child {
                font-size: 14px;
                color: var(--cp-text1);
                margin-bottom: 5px;
              }
            }
          }
          .num {
            color: var(--cp-text1);
          }
        }
      }
      .foot {
        background-color: var(--cp-plain);
        color: var(--cp-primary);
        font-size: 16px;
        text-align: center;
        height: 42px;
        line-height: 42px;
      }
    }
  }
}
</style>
