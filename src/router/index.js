import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: () => import("../App.vue")
    // },

    {
      path: '/samples',
      name: 'Samples',
      component: () => import("../components/SampleList")
    },
    {
      path: "/samples/:id",
      name: "samples-details",
      component: () => import("../components/Sample")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../components/AddSample")
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
export default router