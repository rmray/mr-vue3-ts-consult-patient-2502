<script setup lang="ts">
import type { Patient } from '@/types/patient'
import { showConfirmDialog, showSuccessToast, type FormInstance } from 'vant'
import { computed, ref } from 'vue'
import { idCardRules, nameRules } from '@/utils/rules'
import { addPatient, deletePatient, updatePatient } from '@/services/patient'

const props = defineProps<{
  initPatient: Patient
}>()
const emit = defineEmits<{
  (e: 'close-popup'): void
  (e: 'load-patient'): void
}>()

// 单选框数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

// 表单数据
const patient = ref<Patient>({ ...props.initPatient })
console.log({ ...patient })

// 默认就诊人类型转换
const defaultFlag = computed({
  get: () => (patient.value.defaultFlag ? true : false),
  set: (value) => (patient.value.defaultFlag = value ? 1 : 0)
})

// 添加/更新患者，并验证表单
const formRef = ref<FormInstance>()
async function hdlClickRight() {
  // 验证整个表单
  await formRef.value?.validate()

  // 验证身份证号和性别是否一致
  const num = +patient.value.idCard.slice(-2, -1)
  if (num % 2 !== patient.value.gender) {
    await showConfirmDialog({
      title: '温馨提示',
      message: '填写的性别和身份证号中的不一致\n是否继续？'
    })
  }

  // 验证通过后，执行添加/更新患者
  if (patient.value.id) {
    await updatePatient(patient.value)
  } else {
    await addPatient(patient.value)
  }

  // 收尾工作：关闭弹窗，重新加载患者列表，显示成功提示
  emit('close-popup')
  emit('load-patient')
  showSuccessToast(patient.value.id ? '更新患者成功' : '添加患者成功')
}

/** 删除患者 */
async function hdlDeletePatient() {
  // 确认弹窗
  await showConfirmDialog({
    title: '是否删除患者',
    message: '删除后将无法恢复，是否继续？'
  })

  // 确定删除，执行删除操作
  await deletePatient(patient.value.id!)

  // 收尾工作：关闭弹窗，重新加载患者列表
  emit('close-popup')
  emit('load-patient')
  showSuccessToast(`删除患者 ${patient.value.name} 成功!`)
}
</script>

<template>
  <div class="patient-operate">
    <cp-nav-bar
      :title="patient.id ? '更新患者' : '添加患者'"
      right-text="保存"
      :back="() => emit('close-popup')"
      @click-right="hdlClickRight"
    >
    </cp-nav-bar>

    <!-- 表单 -->
    <van-form ref="formRef">
      <van-field label="真实姓名" placeholder="请输入真实姓名" v-model="patient.name" :rules="nameRules"></van-field>
      <van-field label="身份证号" placeholder="请输入身份证号" v-model="patient.idCard" :rules="idCardRules">
      </van-field>
      <van-field label="性别" class="pb4">
        <template #input>
          <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
        </template>
      </van-field>
      <van-field label="默认就诊人">
        <template #input>
          <van-checkbox :icon-size="18" v-model="defaultFlag"></van-checkbox>
        </template>
      </van-field>
    </van-form>

    <!-- 删除按钮 -->
    <van-action-bar v-if="patient.id" @click="hdlDeletePatient">
      <van-action-bar-button text="删除患者"></van-action-bar-button>
    </van-action-bar>
  </div>
</template>

<style lang="scss" scoped>
.patient-operate {
  padding: 46px 0 80px;
}
.pb4 {
  padding-bottom: 4px;
}
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
