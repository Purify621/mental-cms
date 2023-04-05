import request from '@/utils/request'

/**
 * 获取所有用户答题信息
 * @param {}
 * @returns
 */
export function getPageAll(queryList) {
  return request({
    url: '/result/all',
    method: 'get',
    params: queryList
  })
}
