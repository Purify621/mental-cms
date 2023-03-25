import request from '@/utils/request'

/**
 * 获取所有题库
 * @param {}
 * @returns
 */
export function getQuesionBankAll() {
  return request({
    url: '/questionBank/all',
    method: 'get',
    params: { status: 1 }
  })
}
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

