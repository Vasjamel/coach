import { createApp } from 'vue'
import { createStore } from 'vuex'
import router from './router/router'
import { defineRule } from 'vee-validate'

import './tailwind.css'
import axios from 'axios'
import mainStore from './store/store'

import App from './App.vue'
import BaseButton from './components/UI/BaseButton'
import BaseCard from './components/UI/BaseCard'
import TheSpinner from './components/UI/TheSpinner'

axios.defaults.baseURL =
  'https://couch-finder-51ae1-default-rtdb.firebaseio.com'

const app = createApp(App)
const store = createStore(mainStore)

app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('the-spinner', TheSpinner)

defineRule('required', (value) => {
  if (!value || !value.length) {
    return 'This field is required!'
  }
  return true
})

defineRule('email', (value) => {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
      value
    )
  ) {
    return 'This field must be a valid email adress'
  }
  return true
})

defineRule('password', (value) => {
  if (value.length < 6) {
    return 'Password should be at least 6 characters long!'
  }
  return true
})

app.use(router)
app.use(store)

app.mount('#app')
