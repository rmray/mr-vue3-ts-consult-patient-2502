<script setup lang="ts">
import { ref } from 'vue'

import { mobileRules, passwordRules } from '@/utils/rules'
import { showFailToast } from 'vant'

/** 监听点击事件 */
function clickRightFn() {
  console.log('点击右侧文字')
  // TODO: 跳转注册页面
}

/** 表单 */
const mobile = ref('')
const password = ref('')
const isAgree = ref(false)

/** 监听表单提交事件 */
function hdlSubmit() {
  // 验证是否勾选协议
  if (!isAgree.value) return showFailToast('请勾选协议后再提交')

  console.log('提交表单')
}
</script>

<template>
  <div class="login">
    <!-- 导航栏 -->
    <cp-nav-bar title="登录" right-text="注册" @click-right="clickRightFn"></cp-nav-bar>

    <!-- 头部 -->
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- 表单 -->
    <van-form autocomplete="off" @submit="hdlSubmit">
      <van-field placeholder="请输入手机号" type="tel" v-model="mobile" :rules="mobileRules"></van-field>
      <van-field placeholder="请输入密码" type="password" v-model="password" :rules="passwordRules"></van-field>
      <div class="cp-cell">
        <van-checkbox v-model="isAgree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button type="primary" block round native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>

    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/images/qq.svg" alt="QQ登录" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  padding-top: 46px;
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
