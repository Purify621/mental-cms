// 路由权限页
import router from './router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条 style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import store from './store'
import { asyncRoutes } from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 无重定向白名单

router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否已登录 获取用户token
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到首页
      next({ path: '/' })
      NProgress.done()
    }
    if (store.getters.routes.length === 0) { // 判断当前用户是否已拉取过路由表信息
      store.dispatch('user/getInfo').then(routesMap => { // 拉取路由表
        store.dispatch('permission/generateRoutes', { asyncRoutes, routesMap }).then(addRouters => { // 生成可访问的路由表，asyncRoutes总路由表，routesMap后端返回的路由表
          router.addRoutes(addRouters)
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置replace: true，这样导航就不会留下历史记录
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
    }
  } else {
    /* 没有 token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接跳转
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面。
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
