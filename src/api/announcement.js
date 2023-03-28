import request from '@/utils/request'
// 公告模块
/**
 * 添加公告
 * @param {} data
 * @returns
 */
export function addAnnouncement(data) {
  return request({
    url: '/announcement/add',
    method: 'post',
    data
  })
}
/**
 * 分页查询
 * @param {} data
 * @returns
 */
export function getPageQuery(queryList) {
  return request({
    url: '/announcement/pageQuery',
    method: 'get',
    params: queryList
  })
}
/**
 * 查询所有
 * @param {}
 * @returns
 */
export function getAll() {
  return request({
    url: '/announcement/all',
    method: 'get'
  })
}
/**
 * 根据id删除当前公告
 * @param {} id
 * @returns
 */
export function deleteById(id) {
  return request({
    url: `/announcement/${id}`,
    method: 'delete'
  })
}
