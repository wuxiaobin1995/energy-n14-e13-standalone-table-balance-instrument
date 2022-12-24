/*
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 09:49:03
 * @LastEditTime: 2022-12-24 17:54:17
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
   */

  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout'),
    redirect: '/home',
    children: [
      // 首页
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: ['首页']
      },
      // 用户
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user'),
        meta: ['用户']
      },
      // 添加用户
      {
        path: 'user-add',
        name: 'user-add',
        component: () => import('@/views/user-add'),
        meta: ['添加用户']
      },
      // 用户信息修改
      {
        path: 'user-edit',
        name: 'user-edit',
        component: () => import('@/views/user-edit'),
        meta: ['用户信息修改']
      },
      // 设置医院名称
      {
        path: 'set-hospital',
        name: 'set-hospital',
        component: () => import('@/views/set/set-hospital'),
        meta: ['设置医院名称']
      },
      // 调零
      {
        path: 'set-zero',
        name: 'set-zero',
        component: () => import('@/views/set/set-zero'),
        meta: ['调零']
      },
      // 开发者
      {
        path: 'set-developer',
        name: 'set-developer',
        component: () => import('@/views/set/set-developer'),
        meta: ['开发者']
      },
      // 数据迁移
      {
        path: 'set-data-migration',
        name: 'set-data-migration',
        component: () => import('@/views/set/set-data-migration'),
        meta: ['数据迁移']
      },

      /* 测试模块 */
      // 测试项目选择
      {
        path: 'test-select',
        name: 'test-select',
        component: () => import('@/views/test-mode/select'),
        meta: ['测试项目选择']
      },
      // 平衡能力测试-描述
      {
        path: 'test-balance-ability-desc',
        name: 'test-balance-ability-desc',
        component: () => import('@/views/test-mode/balance-ability/desc'),
        meta: ['平衡能力测试-描述']
      },
      // 平衡能力测试-介绍1
      {
        path: 'test-balance-ability-introduce-1',
        name: 'test-balance-ability-introduce-1',
        component: () =>
          import('@/views/test-mode/balance-ability/introduce-1'),
        meta: ['平衡能力测试-介绍1']
      },
      // 平衡能力测试-介绍2
      {
        path: 'test-balance-ability-introduce-2',
        name: 'test-balance-ability-introduce-2',
        component: () =>
          import('@/views/test-mode/balance-ability/introduce-2'),
        meta: ['平衡能力测试-介绍2']
      },
      // 平衡能力测试-具体测量
      {
        path: 'test-balance-ability-measure',
        name: 'test-balance-ability-measure',
        component: () => import('@/views/test-mode/balance-ability/measure'),
        meta: ['平衡能力测试-具体测量']
      },
      // 平衡能力测试-动作介绍（共16个）
      {
        path: 'test-show-left-1',
        name: 'test-show-left-1',
        component: () =>
          import('@/views/test-mode/balance-ability/show/left-1'),
        meta: ['一档睁眼直立-左腿']
      },
      {
        path: 'test-show-right-1',
        name: 'test-show-right-1',
        component: () =>
          import('@/views/test-mode/balance-ability/show/right-1'),
        meta: ['一档睁眼直立-右腿']
      }
    ]
  },

  {
    path: '/refresh',
    name: 'refresh',
    component: () => import('@/views/refresh')
  },

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
