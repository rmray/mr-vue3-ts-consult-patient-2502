import type { PageReq } from './base'
// 请求
/**
 * 知识类型
 * recommend: 推荐，fatReduction: 减脂，food: 健康饮食，like: 关注医生页面文章
 */
export type KnowledgeType = 'recommend' | 'fatReduction' | 'food' | 'like'
/** 知识列表请求参数 */
export type KnowledgeReq = { type: KnowledgeType } & PageReq

/** 关注参数，topic: 百科话题, knowledge: 百科文章, doc: 医生, disease: 疾病 */
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'
export interface FollowParams {
  type: FollowType
  id: string
}

// 响应
/** 文章信息类型 */
export interface Knowledge {
  id: string
  /** 标题 */
  title: string
  /** 封面[] */
  coverUrl: string[]
  /** 标签 */
  topic: string
  /** 收藏数 */
  collectionNumber: number
  /** 评论数 */
  commentNumber: number
  /** 医生名称 */
  creatorName: string
  /** 医生头像 */
  creatorAvatar: string
  /** 医生医院 */
  creatorHospatalName: string
  /** 关注文章 */
  likeFlag: 0 | 1
  /** 内容 */
  content: string
  /** 医生科室 */
  creatorDep: string
  /** 医生职称 */
  creatorTitles: string
  /** 医生ID */
  creatorId: string
}

/** 医生类型 */
export interface Doctor {
  /** 医生ID */
  id: string
  /** 医生名称 */
  name: string
  /** 头像 */
  avatar: string
  /** 医院名称 */
  hospitalName: string
  /** 医院等级 */
  gradeName: string
  /** 科室 */
  depName: string
  /** 职称 */
  positionalTitles: string
  /** 是否关注，0 已关注 1 未关注 */
  likeFlag: 0 | 1
  /** 接诊服务费 */
  serviceFee: number
  /** 接诊人数 */
  consultationNum: number
  /** 评分 */
  score: number
  /** 主攻方向 */
  major: string
}
