import { followOrUnfollow } from '@/services/home'
import type { FollowType } from '@/types/home'
import { ref } from 'vue'

/** 关注/取消关注 */
export function useFollow(type: FollowType = 'doc') {
  const loading = ref(false)
  async function hdlFollow(item: { id: string; likeFlag: 0 | 1 }) {
    loading.value = true
    await followOrUnfollow({ type, id: item.id })
    loading.value = false
    item.likeFlag = item.likeFlag === 1 ? 0 : 1
  }

  return { loading, hdlFollow }
}
