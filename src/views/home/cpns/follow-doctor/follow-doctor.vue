<script setup lang="ts">
import type { PageReq } from '@/types/base'
import type { Doctor } from '@/types/home'
import { getFollowDoctorList } from '@/services/home'
import DoctorCard from '../doctor-card/doctor-card.vue'
import { onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

// 网络请求
onMounted(() => {
  loadFollowDoctorList()
})
const doctors = ref<Doctor[]>([])
const params = ref<PageReq>({ current: 1, pageSize: 5 })
async function loadFollowDoctorList() {
  const res = await getFollowDoctorList(params.value)
  console.log(res)
  doctors.value.push(...res.data.rows)
}

// 适配医生卡片宽度
const { width } = useWindowSize()
</script>

<template>
  <div class="follow-doctor">
    <div class="head">
      <h3>推荐关注</h3>
      <a href="javascript:;">
        <span>查看更多</span>
        <van-icon name="arrow" />
      </a>
    </div>
    <div class="body">
      <van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
        <template v-for="item in doctors" :key="item.id">
          <van-swipe-item>
            <doctor-card :item="item"></doctor-card>
          </van-swipe-item>
        </template>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
