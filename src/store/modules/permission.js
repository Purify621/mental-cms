import { constantRoutes } from '@/router'

// 自定义多维数组包特定对象转一维数组过滤children，后端若返回一维数组则直接交由filterAsyncRoutes处理
function MultidimensionalToOnedimensional(routesMap) {
  const filterRoutesMap = []
  !(function fn(routesMap) {
    routesMap.forEach(route => {
      const tmp = {}
      for (const key in route) {
        if (Object.hasOwnProperty.call(route, key)) {
          if (key !== 'children') {
            tmp[key] = route[key]
          } else if (key === 'children') {
            fn(route[key])
          }
        }
      }
      filterRoutesMap.push(tmp)
    })
  }(routesMap))
  return filterRoutesMap
}

// 路由索引匹配
export function filterAsyncRoutes(routes, filterRoutesMap) {
  const accessedRoutes = []
  // 遍历总的路由表
  routes.forEach(route => {
    const tmp = {}
    // 使用some函数判断当前的需要过滤的路径是否跟总路由表里的路径有相匹配的
    if (filterRoutesMap.some(a => a.path === route.path)) {
      for (const key in route) {
        if (Object.hasOwnProperty.call(route, key)) {
          if (key !== 'children') {
            tmp[key] = route[key]
          } else if (key === 'children') {
            const tmpC = filterAsyncRoutes(route[key], filterRoutesMap);
            (tmpC.length > 0) && (tmp.children = tmpC)
          }
        }
      }
    }
    tmp.path && accessedRoutes.push(tmp)
  })

  return accessedRoutes
}

// 定义数据
const getDefaultState = () => {
  return {
    routes: [],
    addRoutes: []
  }
}
// 把数据赋值给state
const state = getDefaultState
// 修改 state
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = [
      ...constantRoutes,
      ...routes
    ]
  },
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  }
}
// 提交函数
const actions = {
  // 生成路由表
  generateRoutes({ commit }, { asyncRoutes, routesMap }) {
    return new Promise(resolve => {
      const filterRoutesMap = MultidimensionalToOnedimensional(routesMap)
      const accessedRoutes = [
        ...filterAsyncRoutes(asyncRoutes, filterRoutesMap),
        { path: '*', redirect: '/404', hidden: true }
      ]
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  // 重置信息
  resetState({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE')
      resolve()
    })
  }
}
// 导出信息
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
