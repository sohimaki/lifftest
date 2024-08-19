import { createRouter, createWebHistory } from 'vue-router'
import AllSensorList from '../views/AllSensorList.vue'

const routes = [
  {
    path: '/AllSensorList',
    name: 'AllSensorList',
    component: AllSensorList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
