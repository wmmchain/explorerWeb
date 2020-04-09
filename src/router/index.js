import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/pages/home/home.vue'], resolve)
    },
    {
      path: '/block',
      name: 'block',
      component: resolve => require(['@/components/pages/block/block.vue'], resolve)
    },
    {
      path: '/block/:id',
      name: 'blockDetail',
      component: resolve => require(['@/components/pages/block/blockDetail.vue'], resolve)
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: resolve => require(['@/components/pages/transactions/transactions.vue'], resolve)
    },
    {
      path: '/transactions/:id',
      name: 'txnDetail',
      component: resolve => require(['@/components/pages/transactions/txnDetail.vue'], resolve)
    },
    {
      path: '/address/:id',
      name: 'userDetail',
      component: resolve => require(['@/components/pages/user/userDetail.vue'], resolve)
    },
    {
      path: '/nodes',
      name: 'nodes',
      component: resolve => require(['@/components/pages/nodes/nodes.vue'], resolve)
    },
    {
      path: '/nodeDetail',
      name: 'nodeDetail',
      component: resolve => require(['@/components/pages/nodes/nodeDetail.vue'], resolve)
    },
    //transactions
  ]
})

export default router;
