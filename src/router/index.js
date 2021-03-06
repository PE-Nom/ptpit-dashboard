import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import issues from '@/components/IssueViews/IssuesView'
import products from '@/components/ProductsViews/ProductView'
import statistics from '@/components/Statistics/StatisticsView'
import defaultview from '@/components/DefaultView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/issues',
      name: 'Issues',
      component: issues
    },
    {
      path: '/products',
      name: 'Products',
      component: products
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: statistics
    },
    {
      path: '/default',
      name: 'Default',
      component: defaultview
    }
  ]
})
