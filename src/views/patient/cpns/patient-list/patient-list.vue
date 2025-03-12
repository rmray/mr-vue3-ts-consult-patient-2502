<script setup lang="ts">
import type { Patient } from '@/types/patient'

defineProps<{
  patients: Patient[]
}>()
const emit = defineEmits<{
  (e: 'patient-add', item?: Patient): void
}>()
</script>

<template>
  <div class="patient-list">
    <!-- 患者列表 -->
    <template v-for="item in patients" :key="item.id">
      <div class="patient-item">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}</span>
          <span class="gender">{{ item.genderValue }}</span>
          <span class="age">{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="emit('patient-add', item)">
          <cp-icon name="user-edit"></cp-icon>
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
    </template>

    <!-- 添加患者 -->
    <div class="patient-add" v-if="patients.length < 6" @click="emit('patient-add')">
      <cp-icon name="user-add"></cp-icon>
      <p>添加患者</p>
    </div>

    <!-- 底部提示 -->
    <div class="patient-tip">最多可添加 6 人</div>
  </div>
</template>

<style lang="scss" scoped>
.patient-list {
  padding: 15px;

  .patient-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: var(--cp-bg);
    border-radius: 8px;
    margin-bottom: 15px;
    position: relative;
    border: 1px solid var(--cp-bg);
    transition: all 0.3s;
    overflow: hidden;
    .info {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      span {
        color: var(--cp-tip);
        margin-right: 20px;
        line-height: 30px;
        &.name {
          font-size: 16px;
          color: var(--cp-text1);
          width: 80px;
          margin-right: 0;
        }
        &.id {
          color: var(--cp-text2);
          width: 180px;
        }
      }
    }
    .icon {
      color: var(--cp-tag);
      width: 20px;
      text-align: center;
    }
    .tag {
      position: absolute;
      right: 60px;
      top: 21px;
      width: 30px;
      height: 16px;
      font-size: 10px;
      color: #fff;
      background-color: var(--cp-primary);
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.selected {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
      .icon {
        color: var(--cp-primary);
      }
    }
  }
  .patient-add {
    background-color: var(--cp-bg);
    color: var(--cp-primary);
    text-align: center;
    padding: 15px 0;
    border-radius: 8px;
    .cp-icon {
      font-size: 24px;
    }
  }
  .patient-tip {
    color: var(--cp-tag);
    padding: 12px 0;
  }
}
</style>
