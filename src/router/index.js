import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Exam from '../views/Exam.vue'
import Dashboard from '../views/Dashboard.vue'
import IflLogIn from '../views/IflLogIn.vue'
import AccessExam from '../views/AccessExam.vue'
import ExamSettings from '../components/ExamSettings'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/exam',
    name: 'Exam',
    component: Exam
  },
  {
    path: '/access',
    name: 'AccessExam',
    component: AccessExam
  },
  {
    path: '/ifl',
    name: 'IflLogIn',
    component: IflLogIn
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/exam-settings',
    name: 'ExamSettings',
    component: ExamSettings
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
