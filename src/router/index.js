/*
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 09:49:03
 * @LastEditTime: 2022-04-26 15:57:31
 * @Description : 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  /*
   * 前面加"/"表示绝对路径，不加"/"表示相对路径
   * 一般嵌套路由中的子路由不需要加"/"，它会在父路由后自动加上"/子路由"
   * 比如父 "/father"，子 "child"，要想访问子路由，跳转链接需要写成 "/father/child"
   * meta的配置用于动态面包屑
   */

  /* 登录主页面 */
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login')
  },

  /* 注册页面 */
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register')
  },

  /* 布局组件 */
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout'),
    children: [
      // 首页
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: ['首页']
      },

      // 蓝牙连接
      {
        path: 'bluetooth-connect',
        name: 'bluetooth-connect',
        component: () => import('@/views/bluetooth-connect'),
        meta: ['蓝牙连接']
      },

      // 校准调零
      {
        path: 'calibrate-zero',
        name: 'calibrate-zero',
        component: () => import('@/views/calibrate-zero'),
        meta: ['校准调零']
      },

      // 个人信息修改
      {
        path: 'user-edit',
        name: 'user-edit',
        component: () => import('@/views/user-edit'),
        meta: ['个人信息修改']
      },

      // 管理员信息修改
      {
        path: 'admin-edit',
        name: 'admin-edit',
        component: () => import('@/views/admin-edit'),
        meta: ['管理员信息修改']
      },

      // 用户管理
      {
        path: 'user-manage',
        name: 'user-manage',
        component: () => import('@/views/user-manage'),
        meta: ['用户管理']
      },

      // 开发者页面
      {
        path: 'developer',
        name: 'developer',
        component: () => import('@/views/developer'),
        meta: ['开发者页面']
      },

      /* 测试模式 */
      // BESS平衡错误测试-介绍
      {
        path: 'bess-balance-error-test-introduce',
        name: 'bess-balance-error-test-introduce',
        component: () =>
          import('@/views/test-mode/bess-balance-error-test/introduce'),
        meta: ['BESS平衡错误测试-介绍']
      },
      // BESS平衡错误测试-测量
      {
        path: 'bess-balance-error-test-measure',
        name: 'bess-balance-error-test-measure',
        component: () =>
          import('@/views/test-mode/bess-balance-error-test/measure'),
        meta: ['BESS平衡错误测试-测量']
      }
    ]
  },

  /* 刷新中转页 */
  {
    path: '/refresh',
    name: 'refresh',
    component: () => import('@/views/refresh')
  },

  /* 路由出错时跳转至登录页 */
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  /* 自定义路由切换时页面如何滚动 */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 } // 回到顶部
  }
})

export default router
