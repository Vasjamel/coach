import { createRouter, createWebHistory } from 'vue-router'

import CoachesList from './../components/coach/CoachesList'
import HomePage from './../components/userPages/HomePage'
import AddCoach from './../components/coach/AddCoach'
import LoginForm from './../components/userPages/LoginForm'
import SignupForm from './../components/userPages/SignupForm'
import MessagesList from './../components/messages/MessagesList'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/coaches', component: CoachesList },
    { path: '/home', component: HomePage },
    { path: '/addcoach', component: AddCoach },
    { path: '/login', component: LoginForm },
    { path: '/signup', component: SignupForm },
    { path: '/messages', component: MessagesList },
    
    { path: '/:inactive(.*)', component: HomePage },
  ],
})

export default router
