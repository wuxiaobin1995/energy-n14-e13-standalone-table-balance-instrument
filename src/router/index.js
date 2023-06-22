/*
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 09:49:03
 * @LastEditTime: 2023-06-22 17:29:13
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
      // 导出所选用户的数据（测试、训练、......）
      {
        path: 'user-data-output',
        name: 'user-data-output',
        component: () => import('@/views/user-data-output'),
        meta: ['导出所选用户的数据']
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
      },
      {
        path: 'test-show-left-2',
        name: 'test-show-left-2',
        component: () =>
          import('@/views/test-mode/balance-ability/show/left-2'),
        meta: ['一档睁眼屈膝-左腿']
      },
      {
        path: 'test-show-right-2',
        name: 'test-show-right-2',
        component: () =>
          import('@/views/test-mode/balance-ability/show/right-2'),
        meta: ['一档睁眼屈膝-右腿']
      },
      {
        path: 'test-show-left-3',
        name: 'test-show-left-3',
        component: () =>
          import('@/views/test-mode/balance-ability/show/left-3'),
        meta: ['二档睁眼直立-左腿']
      },
      {
        path: 'test-show-right-3',
        name: 'test-show-right-3',
        component: () =>
          import('@/views/test-mode/balance-ability/show/right-3'),
        meta: ['二档睁眼直立-右腿']
      },
      {
        path: 'test-show-left-4',
        name: 'test-show-left-4',
        component: () =>
          import('@/views/test-mode/balance-ability/show/left-4'),
        meta: ['二档睁眼屈膝-左腿']
      },
      {
        path: 'test-show-right-4',
        name: 'test-show-right-4',
        component: () =>
          import('@/views/test-mode/balance-ability/show/right-4'),
        meta: ['二档睁眼屈膝-右腿']
      },
      {
        path: 'test-show-left-5',
        name: 'test-show-left-5',
        component: () =>
          import('@/views/test-mode/balance-ability/show/left-5'),
        meta: ['一档闭眼直立-左腿']
      },
      {
        path: 'test-show-right-5',
        name: 'test-show-right-5',
        component: () =>
          import('@/views/test-mode/balance-ability/show/right-5'),
        meta: ['一档闭眼直立-右腿']
      },
      {
        path: 'test-show-left-6',
        name: 'test-show-left-6',
        component: () =>
          import('@/views/test-mode/balance-ability/show/left-6'),
        meta: ['一档闭眼屈膝-左腿']
      },
      {
        path: 'test-show-right-6',
        name: 'test-show-right-6',
        component: () =>
          import('@/views/test-mode/balance-ability/show/right-6'),
        meta: ['一档闭眼屈膝-右腿']
      },
      {
        path: 'test-show-left-7',
        name: 'test-show-left-7',
        component: () =>
          import('@/views/test-mode/balance-ability/show/left-7'),
        meta: ['二档闭眼直立-左腿']
      },
      {
        path: 'test-show-right-7',
        name: 'test-show-right-7',
        component: () =>
          import('@/views/test-mode/balance-ability/show/right-7'),
        meta: ['二档闭眼直立-右腿']
      },
      {
        path: 'test-show-left-8',
        name: 'test-show-left-8',
        component: () =>
          import('@/views/test-mode/balance-ability/show/left-8'),
        meta: ['二档闭眼屈膝-左腿']
      },
      {
        path: 'test-show-right-8',
        name: 'test-show-right-8',
        component: () =>
          import('@/views/test-mode/balance-ability/show/right-8'),
        meta: ['二档闭眼屈膝-右腿']
      },

      // 静态稳定测试-描述
      {
        path: 'test-static-stability-desc',
        name: 'test-static-stability-desc',
        component: () => import('@/views/test-mode/static-stability/desc'),
        meta: ['静态稳定测试-描述']
      },
      // 静态稳定测试-具体测量
      {
        path: 'test-static-stability-measure',
        name: 'test-static-stability-measure',
        component: () => import('@/views/test-mode/static-stability/measure'),
        meta: ['静态稳定测试-具体测量']
      },
      // 动态稳定测试-描述
      {
        path: 'test-dynamic-stability-desc',
        name: 'test-dynamic-stability-desc',
        component: () => import('@/views/test-mode/dynamic-stability/desc'),
        meta: ['动态稳定测试-描述']
      },
      // 动态稳定测试-具体测量
      {
        path: 'test-dynamic-stability-measure',
        name: 'test-dynamic-stability-measure',
        component: () => import('@/views/test-mode/dynamic-stability/measure'),
        meta: ['动态稳定测试-具体测量']
      },

      /* 训练模块 */
      // 训练项目选择
      {
        path: 'train-select',
        name: 'train-select',
        component: () => import('@/views/train-mode/select'),
        meta: ['训练项目选择']
      },
      // 静态平衡训练-描述
      {
        path: 'train-static-equilibrium-desc',
        name: 'train-static-equilibrium-desc',
        component: () => import('@/views/train-mode/static-equilibrium/desc'),
        meta: ['静态平衡训练-描述']
      },
      // 静态平衡训练-具体测量
      {
        path: 'train-static-equilibrium-measure',
        name: 'train-static-equilibrium-measure',
        component: () =>
          import('@/views/train-mode/static-equilibrium/measure'),
        meta: ['静态平衡训练-具体测量']
      },
      // 动态平衡训练-描述
      {
        path: 'train-dynamic-equilibrium-desc',
        name: 'train-dynamic-equilibrium-desc',
        component: () => import('@/views/train-mode/dynamic-equilibrium/desc'),
        meta: ['动态平衡训练-描述']
      },
      // 动态平衡训练-具体测量
      {
        path: 'train-dynamic-equilibrium-measure',
        name: 'train-dynamic-equilibrium-measure',
        component: () =>
          import('@/views/train-mode/dynamic-equilibrium/measure'),
        meta: ['动态平衡训练-具体测量']
      },

      /* 数据记录 */
      // 测试
      {
        path: 'test-record',
        name: 'test-record',
        component: () => import('@/views/record/test'),
        meta: ['测试-数据记录'],
        redirect: '/test-record/balance-ability',
        children: [
          // 平衡能力测试
          {
            path: 'balance-ability',
            name: 'balance-ability',
            component: () => import('@/views/record/test/balance-ability'),
            meta: ['平衡能力测试']
          },
          // 静态稳定测试
          {
            path: 'static-stability',
            name: 'static-stability',
            component: () => import('@/views/record/test/static-stability'),
            meta: ['静态稳定测试']
          },
          // 动态稳定测试
          {
            path: 'dynamic-stability',
            name: 'dynamic-stability',
            component: () => import('@/views/record/test/dynamic-stability'),
            meta: ['动态稳定测试']
          }
        ]
      },
      // 训练
      {
        path: 'train-record',
        name: 'train-record',
        component: () => import('@/views/record/train'),
        meta: ['训练-数据记录'],
        redirect: '/train-record/static-equilibrium',
        children: [
          // 静态平衡训练
          {
            path: 'static-equilibrium',
            name: 'static-equilibrium',
            component: () => import('@/views/record/train/static-equilibrium'),
            meta: ['静态平衡训练']
          },
          // 动态平衡训练
          {
            path: 'dynamic-equilibrium',
            name: 'dynamic-equilibrium',
            component: () => import('@/views/record/train/dynamic-equilibrium'),
            meta: ['动态平衡训练']
          }
        ]
      }
    ]
  },

  /* 测试报告 */
  // 平衡能力测试PDF
  {
    path: '/test-balance-ability-pdf',
    name: 'test-balance-ability-pdf',
    component: () => import('@/views/test-mode/balance-ability/pdf'),
    meta: ['平衡能力测试-PDF']
  },
  // 平衡能力测试-导出长期趋势PDF
  {
    path: '/test-balance-ability-secular-trend-pdf',
    name: 'test-balance-ability-secular-trend-pdf',
    component: () =>
      import('@/views/record/test/balance-ability/secular-trend-pdf'),
    meta: ['平衡能力测试-导出长期趋势PDF']
  },
  // 静态稳定测试PDF
  {
    path: '/test-static-stability-pdf',
    name: 'test-static-stability-pdf',
    component: () => import('@/views/test-mode/static-stability/pdf'),
    meta: ['静态稳定测试-PDF']
  },
  // 动态稳定测试PDF
  {
    path: '/test-dynamic-stability-pdf',
    name: 'test-dynamic-stability-pdf',
    component: () => import('@/views/test-mode/dynamic-stability/pdf'),
    meta: ['动态稳定测试-PDF']
  },

  /* 训练报告 */
  // 静态平衡训练PDF
  {
    path: '/train-static-equilibrium-pdf',
    name: 'train-static-equilibrium-pdf',
    component: () => import('@/views/train-mode/static-equilibrium/pdf'),
    meta: ['静态平衡训练-PDF']
  },
  // 动态平衡训练PDF
  {
    path: '/train-dynamic-equilibrium-pdf',
    name: 'train-dynamic-equilibrium-pdf',
    component: () => import('@/views/train-mode/dynamic-equilibrium/pdf'),
    meta: ['动态平衡训练-PDF']
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
