import request from '@/utils/request'

/**
 * 查询所有试题信息
 * @returns
 */
export function questionStatus() {
  return request({
    url: '/questionBank/all',
    method: 'get'
  })
}
/**
 * 分页查询
 * @param {*} queryList 分页查询对象
 * @returns
 */
export function getQuestionPageQuery(queryList) {
  return request({
    url: '/questionBank/pageQuery',
    method: 'get',
    params: queryList
  })
}

/**
 * 根据id修改题库状态
 * @param {} id 试题id
 * @returns
 */
export function updateQuestionStatus(id) {
  return request({
    url: '/questionBank/status',
    method: 'post',
    params: { id: id }
  })
}
/**
 * 上传题库
 * @param {} data
 * @returns
 */
export function uploadQuestion(data) {
  return request({
    url: '/questionBank/upload',
    method: 'post',
    data
  })
}
/**
 *
 * @returns 题库下载
 */
export function downloadQuestion() {
  return request({
    url: '/questionBank/download',
    method: 'get'
  })
}

/**
 * 获取所有题库 已弃用
 * @param {}
 * @returns
 */
/* export function getQuesionBankAll() {
  return request({
    url: '/questionBank/all',
    method: 'get',
    params: { status: 1 }
  })
} */

/**
 * 根据id删除题库
 */
export function deleteQuestion(id) {
  return request({
    url: `/questionBank/${id}`,
    method: 'delete'
  })
}
