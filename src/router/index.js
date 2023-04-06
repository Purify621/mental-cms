import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 没有权限要求的路由表 所有角色均可访问
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  // 404 页必须放在末尾 !!!
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

// 总的路由表
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/student',
    children: [{
      path: 'student',
      name: 'StudentPage',
      component: () => import('@/views/admin/StudentPage'),
      meta: { title: '学生管理', icon: 'student' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/teacher',
    children: [{
      path: 'teacher',
      name: 'TeacherPage',
      component: () => import('@/views/admin/TeacherPage'),
      meta: { title: '教师管理', icon: 'teacher' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/quesionbank',
    children: [{
      path: 'quesionbank',
      name: 'QuestionBankPage',
      component: () => import('@/views/admin/QuestionBankPage'),
      meta: { title: '题库管理', icon: 'questionbank' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/studentresult',
    children: [{
      path: 'studentresult',
      name: 'StudentResultPage',
      component: () => import('@/views/admin/StudentResultPage'),
      meta: { title: '学生评测结果管理', icon: 'studentresult' }
    }]
  },
  {
    path: '/Popularscience',
    component: Layout,
    meta: { title: '心理健康知识科普', icon: 'mentalpopularscience' },
    children: [
      {
        path: 'add',
        name: 'AddPopularScience',
        component: () => import('@/views/admin/PopularScience/AddPopularScience'),
        meta: { title: '添加科普文章', icon: 'mentalpopularscience' }
      },
      {
        path: 'edit',
        name: 'EditPopularScience',
        component: () => import('@/views/admin/PopularScience/EditPopularScience'),
        meta: { title: '管理科普文章', icon: 'mentalpopularscience' }
      }
    ]
  },
  {
    path: '/Announcement',
    component: Layout,
    meta: { title: '公告管理', icon: 'announcement' },
    children: [
      {
        path: 'add',
        name: 'AddAnnouncement',
        component: () => import('@/views/admin/Announcement/AddAnnouncement'),
        meta: { title: '添加公告', icon: 'announcement' }
      },
      {
        path: 'edit',
        name: 'EditAnnouncement',
        component: () => import('@/views/admin/Announcement/EditAnnouncement'),
        meta: { title: '管理公告', icon: 'announcement' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/advisory',
    children: [{
      path: 'advisory',
      name: 'AdvisoryAssistancePage',
      component: () => import('@/views/teacher/AdvisoryAssistancePage'),
      meta: { title: '咨询援助', icon: 'advisory' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/evaluation',
    children: [{
      path: 'evaluation',
      name: 'SelectStudentEvaluationPage',
      component: () => import('@/views/teacher/SelectStudentEvaluationPage'),
      meta: { title: '学生评价', icon: 'evaluation' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/result',
    children: [{
      path: 'result',
      name: 'SelectStudentResultPage',
      component: () => import('@/views/teacher/SelectStudentResultPage'),
      meta: { title: '学生评测结果', icon: 'result' }
    }]
  }

]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
