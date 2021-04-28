import { createRouter, createWebHistory } from 'vue-router'
// import store from './../store/store'

import CoachesList from './../components/coach/CoachesList'
import HomePage from './../components/userPages/HomePage'
import AddCoach from './../components/coach/AddCoach'
import LoginForm from './../components/userPages/LoginForm'
import SignupForm from './../components/userPages/SignupForm'
import MessagesList from './../components/messages/MessagesList'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/coaches', component: CoachesList, meta: { needAuth: true } },
    { path: '/home', component: HomePage },
    { path: '/addcoach', component: AddCoach, meta: { needAuth: true } },
    { path: '/login', component: LoginForm, meta: { noAuth: true } },
    { path: '/signup', component: SignupForm, meta: { noAuth: true } },
    { path: '/messages', component: MessagesList, meta: { needAuth: true } },
    { path: '/:inactive(.*)', component: HomePage },
  ],
})

// router.beforeEach((to, _, next) => {
//   if (to.meta.needAuth && !store.getters.loggedIn) {
//     next('/home')
//   } else if (to.meta.noAuth && store.getters.loggedIn) {
//     next('/coaches')
//   } else {
//     next()
//   }
// })

export default router
