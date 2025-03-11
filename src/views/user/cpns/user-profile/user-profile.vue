<script setup lang="ts">
import { useUserStore } from '@/store'
import type { UserInfo } from '@/types/user'
import { showConfirmDialog } from 'vant'
import { useRouter } from 'vue-router'

defineProps<{
  userInfo: UserInfo
  tools: { label: string; path: string }[]
}>()

/** 退出登录 */
const userStore = useUserStore()
const router = useRouter()
async function hdlLogout() {
  await showConfirmDialog({
    title: '退出登录',
    message: '确定退出登录吗？'
  })
  userStore.delUser()
  router.push('/login')
}
</script>

<template>
  <div class="user-profile">
    <!-- 头部 -->
    <div class="user-profile-head">
      <div class="top">
        <van-image round fit="cover" :src="userInfo.avatar"></van-image>
        <div class="name">
          <p>{{ userInfo.account }}</p>
          <p><cp-icon name="user-edit"></cp-icon></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ userInfo.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>

    <!-- 订单 -->
    <div class="user-profile-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/order"> 全部订单 <van-icon name="arrow" /></router-link>
      </div>
      <van-row>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo.paidNumber || ''">
            <cp-icon name="user-paid"></cp-icon>
          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo.shippedNumber || ''">
            <cp-icon name="user-shipped"></cp-icon>
          </van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo.receivedNumber || ''">
            <cp-icon name="user-received"></cp-icon>
          </van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo.finishedNumber || ''">
            <cp-icon name="user-finished"></cp-icon>
          </van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>

    <!-- 分组 -->
    <div class="user-profile-group">
      <h3>快捷工具</h3>
      <template v-for="(item, index) in tools" :key="item.label">
        <van-cell :title="item.label" :to="item.path" is-link :border="false">
          <template #icon>
            <cp-icon :name="`user-tool-0${index + 1}`"></cp-icon>
          </template>
        </van-cell>
      </template>
    </div>

    <!-- 退出登录 -->
    <a href="javascript:;" class="logout" @click="hdlLogout">退出登录</a>
  </div>
</template>

<style lang="scss" scoped>
.user-profile {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;
  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;
    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;
      .van-image {
        width: 70px;
        height: 70px;
      }
      .name {
        padding-left: 10px;
        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
    }
    .van-row {
      margin: 0 -15px;
      padding-top: 15px;
      p {
        text-align: center;
        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }
        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
      a {
        color: var(--cp-tip);
      }
    }
    .van-col {
      text-align: center;
      .cp-icon {
        font-size: 28px;
      }
      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }
  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h3 {
      padding-left: 16px;
      line-height: 44px;
    }
    .van-cell {
      align-items: center;
    }
    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--cp-price);
  }
}
</style>
