<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeList from './cpns/knowledge-list/knowledge-list.vue'
import FollowDoctor from './cpns/follow-doctor/follow-doctor.vue'
import { useConsultStore } from '@/store'
import { ConsultType } from '@/enum'

// 选项卡
const active = ref(1)

// store
const consultStore = useConsultStore()
</script>

<template>
  <div class="home">
    <!-- 头部 -->
    <div class="home-header">
      <div class="con">
        <h1>优医</h1>
        <div class="search">
          <cp-icon name="home-search" />
          搜一搜：疾病/症状/医生/健康知识
        </div>
      </div>
    </div>

    <!-- 导航栏 -->
    <div class="home-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icon name="home-doctor" />
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/consult/fast" class="nav" @click="consultStore.setType(ConsultType.Fast)">
            <cp-icon name="home-graphic" />
            <p class="title">急速问诊</p>
            <p class="desc">20s医生急速回复</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icon name="home-prescribe" />
            <p class="title">开药门诊</p>
            <p class="desc">线上买药更方便</p>
          </router-link>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-order" />
            <p class="title">药品订单</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-docs" />
            <p class="title">健康档案</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-rp" />
            <p class="title">我的处方</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-find" />
            <p class="title">疾病查询</p>
          </router-link>
        </van-col>
      </van-row>
    </div>

    <!-- 轮播图 -->
    <div class="home-banner">
      <van-swipe indicator-color="#fff">
        <van-swipe-item>
          <img src="@/assets/images/ad.png" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/ad.png" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 知识列表选项卡 -->
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注">
        <follow-doctor></follow-doctor>
        <knowledge-list type="like"></knowledge-list>
      </van-tab>
      <van-tab title="推荐">
        <knowledge-list type="recommend"></knowledge-list>
      </van-tab>
      <van-tab title="减脂">
        <knowledge-list type="fatReduction"></knowledge-list>
      </van-tab>
      <van-tab title="饮食">
        <knowledge-list type="food"></knowledge-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-bottom: 50px;
}
.home-header {
  height: 100px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  .con {
    position: relative;
    padding: 0 15px;
    > h1 {
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding: 20px 0;
      line-height: 1;
      padding-left: 5px;
    }
    .search {
      height: 40px;
      border-radius: 20px;
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: var(--cp-dark);
      font-size: 13px;
      .cp-icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }
}
.home-navs {
  padding: 10px 15px 0 15px;
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .cp-icon {
      font-size: 48px;
    }
    .title {
      font-weight: 500;
      margin-top: 5px;
      color: var(--cp-text1);
    }
    .desc {
      font-size: 11px;
      color: var(--cp-tag);
      margin-top: 2px;
    }
    &.min {
      .cp-icon {
        font-size: 31px;
      }
      .title {
        font-size: 13px;
        color: var(--cp-text2);
        font-weight: normal;
      }
    }
  }
}
.home-banner {
  padding: 10px 15px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
