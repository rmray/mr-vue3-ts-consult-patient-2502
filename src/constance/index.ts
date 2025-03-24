import { IllnessTime } from '@/enum'

export const illnessTimeOptions = [
  { label: '一周内', value: IllnessTime.Week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '半年以上', value: IllnessTime.More }
]

export const consultFlagOptions = [
  { label: '就诊过', value: 1 },
  { label: '没就诊过', value: 0 }
]
