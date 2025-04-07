<script setup lang="ts">
import { ConsultOrderStatus } from '@/enum'
import { uploadImage } from '@/services/consult'
import type { Image } from '@/types/consult'
import type { UploaderAfterRead } from 'vant'
import { computed, ref } from 'vue'

const props = defineProps<{
  status: ConsultOrderStatus
}>()
const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-image', image: Image): void
}>()

// 输入框
const disabled = computed(() => props.status !== ConsultOrderStatus.ConsultChating)

// 发送图片，文件上传
const onAfterRead: UploaderAfterRead = async (item) => {
  // console.log('item: ', item)
  if (Array.isArray(item)) return false
  if (!item.file) return false

  // 上传图片
  const res = await uploadImage(item.file)

  // 发射事件 send-image
  emit('send-image', res.data)
}

/** 发送文字 */
const text = ref('')
function sendText() {
  emit('send-text', text.value)
  text.value = ''
}
</script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      placeholder="问医生"
      class="input"
      :disabled="disabled"
      v-model="text"
      @keyup.enter="sendText"
    />
    <van-uploader :after-read="onAfterRead" :disabled="disabled" :preview-image="false">
      <cp-icon name="consult-img"></cp-icon>
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
