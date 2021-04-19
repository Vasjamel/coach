import { createRouter, createWebHistory } from 'vue-router'

import CoachesList from './../components/coach/CoachesList'
import HomePage from './../components/userPages/HomePage'
import AddCoach from './../components/coach/AddCoach'
import LoginForm from './../components/userPages/LoginForm'
import SignupForm from './../components/userPages/SignupForm'
import ContactCoach from './../components/coach/ContactCoach'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/coaches', component: CoachesList },
    { path: '/home', component: HomePage },
    { path: '/addcoach', component: AddCoach },
    { path: '/login', component: LoginForm },
    { path: '/signup', component: SignupForm },
    { path: '/:inactive(.*)', component: HomePage },
    { path: '/contact', component: ContactCoach },
  ],
})

export default router
