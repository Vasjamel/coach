import { createApp } from 'vue'
import { createStore } from 'vuex'

import './tailwind.css'
import axios from 'axios'
import mainStore from './store/store'

import App from './App.vue'
import BaseButton from './components/BaseButton'

axios.defaults.baseURL =
  'https://couch-finder-51ae1-default-rtdb.firebaseio.com'

const app = createApp(App)
const store = createStore(mainStore)

app.component('base-button', BaseButton)

app.use(store)
app.mount('#app')
