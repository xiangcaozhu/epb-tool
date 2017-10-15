import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (views) {
  // '@' is aliased to src/views
  return () => import(`@/${views}.vue`)
}

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  routes: [{
    path: '/',
    component: load('Home'),
    children: [{
      path: '/',
      redirect: '/homeList'
    },
    {
      path: '/homeList',
      name: 'homeList',
      component: load('HomeList')
    },
    {
      path: 'giveName',
      name: 'giveName',
      component: load('GiveName')
    },
    {
      path: 'giveNameList',
      name: 'giveNameList',
      component: load('GiveNameList')
    },
    {
      path: 'checkName',
      name: 'checkName',
      component: load('CheckName')
    },
    {
      path: 'checkNameResult',
      name: 'checkNameResult',
      component: load('CheckNameResult')
    },
    {
      path: 'manageRange',
      name: 'manageRange',
      component: load('ManageRange')
    },
    {
      path: 'manageRangeList',
      name: 'manageRangeList',
      component: load('ManageRangeList')
    },
    {
      path: 'manageRangeDetail/:id',
      name: 'manageRangeDetail',
      component: load('ManageRangeDetail')
    },
    {
      path: 'materialList',
      name: 'materialList',
      component: load('MaterialList')
    },
    {
      path: 'materialDetail/:id',
      name: 'materialDetail',
      component: load('MaterialDetail')
    }]
  },
  // Always leave this last one
  {
    path: '*',
    component: load('Error404')
  } // Not found
  ]
})
export default router
