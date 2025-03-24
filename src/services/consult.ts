import type { Result } from '@/types/base'
import type { Department, Image } from '@/types/consult'
import mrRequest from '@/utils/request'

/** 获取所有科室列表 */
export function getAllDepartment() {
  return mrRequest.get<Result<Department[]>>({
    url: '/dep/all'
  })
}

/** 图片上传 */
export function uploadImage(file: File) {
  const fd = new FormData()
  fd.append('file', file)

  return mrRequest.post<Result<Image>>({
    url: '/upload',
    data: fd
  })
}
