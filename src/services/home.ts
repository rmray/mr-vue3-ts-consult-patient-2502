import type { PageReq, PageRes, Result } from '@/types/base'
import type { Doctor, FollowParams, Knowledge, KnowledgeReq } from '@/types/home'
import mrRequest from '@/utils/request'

/** 获取知识列表 */
export function getKnowledgeList(params: KnowledgeReq) {
  return mrRequest.get<Result<PageRes<Knowledge[]>>>({ url: '/patient/home/knowledge', params })
}

/** 获取关注医生列表 */
export function getFollowDoctorList(params: PageReq) {
  return mrRequest.get<Result<PageRes<Doctor[]>>>({ url: '/home/page/doc', params })
}

/** 关注/取消关注 */
export function followOrUnfollow(params: FollowParams) {
  return mrRequest.post<Result<{ id: string }>>({ url: '/like', data: params })
}
