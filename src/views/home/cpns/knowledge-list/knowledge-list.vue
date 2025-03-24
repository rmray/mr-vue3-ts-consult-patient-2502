<script setup lang="ts">
import type { Knowledge, KnowledgeReq, KnowledgeType } from '@/types/home'
import KnowledgeCard from '../knowledge-card/knowledge-card.vue'
import { ref } from 'vue'
import { getKnowledgeList } from '@/services/home'

const props = defineProps<{
  type: KnowledgeType
}>()

// 列表加载更多
const loading = ref(false)
const finished = ref(false)

// 网络请求
/** 知识列表数据 */
const params = ref<KnowledgeReq>({ type: props.type, current: 1, pageSize: 5 })
const knowledges = ref<Knowledge[]>([])
const pageTotal = ref(0)
const total = ref(0)
async function loadKnowledgeList() {
  // 获取数据
  const res = await getKnowledgeList(params.value)
  // console.log(res)
  knowledges.value.push(...res.data.rows)
  pageTotal.value = res.data.pageTotal
  total.value = res.data.total

  // 列表加载更多
  if (knowledges.value.length >= total.value) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="loadKnowledgeList">
      <template v-for="item in knowledges" :key="item.id">
        <knowledge-card :item="item"></knowledge-card>
      </template>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
