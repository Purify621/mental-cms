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
/**
 * 更新科普文章操作
 * @param {} data
 * @returns
 */
export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

/**
 * 分页查询
 * @param {} queryList
 * @returns
 */
export function getArticlePageQuery(queryList) {
  return request({
    url: '/article/pageQuery',
    method: 'get',
    params: queryList
  })
}

/**
 * 获取所有科普文章信息包含已禁用的
 * @param {} data
 * @returns
 */
export function getArticleAll() {
  return request({
    url: '/article/alls',
    method: 'get'
  })
}
/**
 * 根据id删除对应文章
 * @param {} id
 * @returns
 */
export function deleteArticleId(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete'
  })
}
