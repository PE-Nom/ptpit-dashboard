import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import issues from '@/components/issues'
import products from '@/components/ProductsViews/ProductView'

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
    }
  ]
})
