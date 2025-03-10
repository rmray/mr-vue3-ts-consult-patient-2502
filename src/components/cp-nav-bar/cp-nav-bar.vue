<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  title?: string
  rightText?: string
}>()
const emit = defineEmits<{
  (e: 'click-right'): void
}>()

/** 监听点击右侧文字，向外发射事件 */
function hdlClickRight() {
  emit('click-right')
}

/** 监听点击左侧返回按钮，执行返回页面 */
const router = useRouter()
function hdlClickLeft() {
  // console.log(history.state)
  if (history.state?.back === null) {
    router.push('/')
  } else {
    router.back()
  }
}
</script>

<template>
  <div class="cp-nav-bar">
    <van-nav-bar
      fixed
      :title="title"
      :right-text="rightText"
      left-arrow
      @click-right="hdlClickRight"
      @click-left="hdlClickLeft"
    ></van-nav-bar>
  </div>
</template>

<style lang="scss" scoped>
.cp-nav-bar {
  color: inherit;
}

:deep() {
  .van-nav-bar {
    &__arrow {
      color: var(--cp-text3);
      font-size: 18px;
    }
    &__title {
      font-size: 15px;
    }
    &__text {
      color: var(--cp-primary);
    }
  }
}
</style>
