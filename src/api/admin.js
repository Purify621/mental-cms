import request from '@/utils/request'

// 模拟数据路由表
const routesMaps = {
  admin: [
    {
      path: '/',
      children: [
        {
          path: 'student'
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'teacher'
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'quesionbank'
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'studentresult'
        }
      ]
    },
    {
      path: '/Popularscience',
      children: [
        {
          path: 'add'
        }, {
          path: 'edit'
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'announcement'
        }
      ]
    }
  ],
  teacher: [
    {
      path: '/',
      children: [
        {
          path: 'result'
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'advisory'
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'evaluation'
        }
      ]
    }
  ]
}

/**
 * 管理员登录
 * @param {"username":"","password":""} data
 * @returns
 */
export const adminLogin = (data) => {
  return request({
    url: '/login/admin',
    method: 'post',
    data
  })
}

export function getInfo(username) {
  // 模拟后台返回数据
  return new Promise(resolve => resolve(
    {
      routesMap: routesMaps[username]
    }
  ))
}

/**
 * 根据id获取管理员信息
 * @param {} id
 * @returns
 */
export const getInfoId = (id) => {
  return request({
    url: `/admin/${id}`,
    method: 'get'
  })
}

/**
 * 修改管理员信息
 * @param {} adminInfo 传入管理员对象
 * @returns
 */
export const updateAdminInfo = (adminInfo) => {
  return request({
    url: '/admin/update',
    method: 'post',
    data: adminInfo
  })
}

