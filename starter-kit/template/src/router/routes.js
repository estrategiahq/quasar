const routes = [
  {
    path: '/',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/DrawerLayout.vue'),
    children: [
      { path: 'repositories', name: 'repositories', component: () => import('pages/Repositories.vue') },
      { path: 'form/:owner/:name', name: 'form', component: () => import('pages/Form.vue') }
    ]
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
