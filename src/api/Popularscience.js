import request from '@/utils/request'

/**
 * 添加科普文章
 * @param {} data
 * @returns
 */
export function addPopularScience(data) {
  return request({
    url: '/article/add',
    method: 'post',
    data
  })
}
