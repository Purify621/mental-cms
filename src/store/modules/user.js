import { setToken, removeToken } from '@/utils/auth' // 设置cookie
import { resetRouter } from '@/router'
import { adminLogin, getInfo } from '@/api/admin'
import { teacherLogin } from '@/api/teacher'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    school: '',
    id: '',
    role: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_SCHOOL: (state, school) => {
    state.school = school
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // 管理员登录
  adminLogin({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      adminLogin(userInfo).then(res => {
        // 存储当前用户的 token , token 有效期为24小时
        commit('SET_NAME', 'admin')
        commit('SET_ID', res.data.user.id) // 设置id
        commit('SET_AVATAR', res.data.user.avatar) // 设置头像
        commit('SET_SCHOOL', res.data.user.school) // 设置学校
        commit('SET_ROLE', res.data.user.role) // 设置身份
        // 设置token的方法,存储token到cookie中
        setToken(res.data.token)
        // 存储token到vuex中
        commit('SET_TOKEN', res.data.token)
        resolve('登录成功') // 返回提示信息
      }).catch(() => {
        reject('用户名或密码错误') // 返回提示信息
      })
    })
  },

  // 获取用户信息
  getInfo({ state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.name).then(response => {
        const { routesMap } = response
        resolve(routesMap)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 教师登录
  teacherLogin({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      teacherLogin(userInfo).then(res => {
        commit('SET_TOKEN', res.data)
        commit('SET_NAME', 'teacher')
        commit('SET_ID', res.data.user.tid) // 设置id
        commit('SET_AVATAR', res.data.user.avatar) // 设置头像
        commit('SET_SCHOOL', res.data.user.school) // 设置学校
        commit('SET_ROLE', res.data.user.role) // 设置身份
        // 设置token的方法, 存储token到cookie中
        setToken(res.data)
        // 存储token到vuex中
        commit('SET_TOKEN', res.data.token)
        resolve('登录成功') // 返回提示信息
      }).catch(() => {
        reject('用户名或密码错误') // 返回提示信息
      })
    })
  },
  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // 删除令牌
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // 删除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 必须先删除令牌
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

