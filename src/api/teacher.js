import request from '@/utils/request'

/**
 * 教师登录
 * @param {"username":"","password":""} data
 * @returns
 */
export const teacherLogin = (data) => {
  return request({
    url: 'login/teacher',
    method: 'post',
    data
  })
}
/**
 *
 * @param {} queryList 分页查询的条件
 * @returns 查询后的数据 包含总条目数
 */
export function teacherInfo(queryList) {
  return request({
    url: '/teacher/pageQuery',
    method: 'get',
    params: queryList
  })
}
/**
 * 根据工号查询教师信息
 * @param {} tid 工号
 * @returns
 */
export function selectTeacherInfo(tid) {
  return request({
    url: `/teacher/${tid}`,
    method: 'get'
  })
}
/**
 * 修改教师信息
 * @param {} teacherInfo 传递教师对象
 * @returns
 */
export function updateteacherInfo(teacherInfo) {
  return request({
    url: '/teacher/update',
    method: 'post',
    data: teacherInfo
  })
}
/**
 * 根据工号删除教师信息
 * @param {} tids 需要删除学生的 tid 可以传递多个如 {tids: 202202031901.202202031902}
 * @returns
 */
export function deleteTeacherInfo(tids) {
  return request({
    url: '/teacher/delete/',
    method: 'delete',
    params: tids
  })
}
/**
 * 添加教师
 * @param {} student 教师对象
 * @returns
 */
export function addTeacher(teacher) {
  return request({
    url: '/teacher/add',
    method: 'post',
    data: teacher
  })
}
