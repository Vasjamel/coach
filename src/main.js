import { createApp } from 'vue'
import { createStore } from 'vuex'
import router from './router/router'

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

app.use(router)
app.use(store)

app.mount('#app')
