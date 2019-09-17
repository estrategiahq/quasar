
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('pages/Index.vue') },
      { path: 'repositories', name: 'repositories', component: () => import('pages/Repositories.vue') },
      { path: 'form/:owner/:name', name: 'form', component: () => import('pages/Form.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
