import request from '@/utils/request'

/**
 *
 * @param {} queryList 分页查询的条件
 * @returns 查询后的数据 包含总条目数
 */
export function studentInfo(queryList) {
  return request({
    url: '/student/pageQuery',
    method: 'get',
    params: queryList
  })
}
/**
 * 根据学号查询学生信息
 * @param {} sid 学号
 * @returns
 */
export function selectStudentInfo(sid) {
  return request({
    url: `/student/${sid}`,
    method: 'get'
  })
}
/**
 * 修改学生信息
 * @param {} studentInfo 传递学生对象
 * @returns
 */
export function updateStudentInfo(studentInfo) {
  return request({
    url: '/student/update',
    method: 'post',
    data: studentInfo
  })
}
/**
 * 根据学号删除学生信息
 * @param {} sids 需要删除学生的sid 可以传递多个
 * @returns
 */
export function deleteStudentInfo(sids) {
  return request({
    url: '/student/delete/',
    method: 'delete',
    params: sids
  })
}
/**
 * 添加学生
 * @param {} student 学生对象
 * @returns
 */
export function addStudent(student) {
  return request({
    url: '/student/add',
    method: 'post',
    data: student
  })
}
