<script setup lang="ts">
import { ref } from 'vue'

import { codeRules, mobileRules, passwordRules } from '@/utils/rules'
import { showFailToast, showSuccessToast } from 'vant'
import { getCode, loginByCode, loginByPassword } from '@/services/user'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import mrRequest from '@/utils/request'

/** 监听点击事件 */
function clickRightFn() {
  console.log('点击右侧文字')
  // TODO: 跳转注册页面
}

// 表单
// 密码登录
const mobile = ref('')
const password = ref('')
const isAgree = ref(false)
const isShow = ref(false)
// 短信验证码登录
const isPass = ref(true)
const code = ref('')

/** 获取短信验证码 */
async function hdlGetCode() {
  const res = await getCode({ mobile: mobile.value, type: 'login' })
  code.value = res.data.code
}

/** 监听表单提交事件 */
const userStore = useUserStore()
const router = useRouter()
async function hdlSubmit() {
  // 验证是否勾选协议
  if (!isAgree.value) return showFailToast('请勾选协议后再提交')

  // 登录操作(合并密码登录和短信验证码登录) */
  const res = isPass.value
    ? await loginByPassword({ mobile: mobile.value, password: password.value })
    : await loginByCode({ mobile: mobile.value, code: code.value })

  if (res.code === 10000) {
    userStore.setUser(res.data)
    showSuccessToast('登录成功!')
    router.push((router.currentRoute.value.query.returnUrl as string) || '/user')
  } else {
    showFailToast('登录失败!\n' + res.message)
  }
}

// TODO: 第三方登录
</script>

<template>
  <div class="login">
    <!-- 导航栏 -->
    <cp-nav-bar title="登录" right-text="注册" @click-right="clickRightFn"></cp-nav-bar>

    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- 表单 -->
    <van-form autocomplete="off" @submit="hdlSubmit">
      <van-field placeholder="请输入手机号" type="tel" v-model="mobile" :rules="mobileRules"></van-field>
      <van-field
        v-if="isPass"
        placeholder="请输入密码"
        :type="isShow ? 'text' : 'password'"
        v-model="password"
        :rules="passwordRules"
      >
        <template #button>
          <cp-icon :name="`login-eye-${isShow ? 'on' : 'off'}`" @click="isShow = !isShow"></cp-icon>
        </template>
      </van-field>
      <van-field v-else placeholder="短信验证码" type="text" v-model="code" :rules="codeRules">
        <template #button>
          <span class="btn-send" @click="hdlGetCode">发送验证码</span>
        </template>
      </van-field>
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
