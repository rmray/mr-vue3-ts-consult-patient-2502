<script setup lang="ts">
import { useFollow } from '@/hooks/home'
import { followOrUnfollow } from '@/services/home'
import type { Doctor } from '@/types/home'
import { ref } from 'vue'

defineProps<{
  item: Doctor
}>()

// 关注医生
const { loading, hdlFollow } = useFollow()
</script>

<template>
  <div class="doctor-card">
    <van-image round :src="item.avatar"></van-image>
    <p class="name">{{ item.name }}</p>
    <p class="van-ellipsis">{{ item.hospitalName }} {{ item.depName }}</p>
    <p>{{ item.positionalTitles }}</p>
    <van-button round type="primary" size="small" :loading="loading" @click="hdlFollow(item)">
      {{ item.likeFlag === 0 ? '已关注' : '+ 关注' }}
    </van-button>
  </div>
</template>

<style lang="scss" scoped>
.doctor-card {
  width: 135px;
  height: 190px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
  text-align: center;
  padding: 15px;
  margin-left: 15px;
  display: inline-block;
  box-sizing: border-box;
  > .van-image {
    width: 58px;
    height: 58px;
    vertical-align: top;
    border-radius: 50%;
    margin: 0 auto 8px;
  }
  > p {
    margin-bottom: 0;
    font-size: 11px;
    color: var(--cp-tip);
    &.name {
      font-size: 13px;
      color: var(--cp-text1);
      margin-bottom: 5px;
    }
  }
  > .van-button {
    padding: 0 12px;
    height: 28px;
    margin-top: 8px;
    width: 72px;
  }
}
</style>
