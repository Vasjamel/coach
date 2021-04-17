import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './tailwind.css'
import BaseButton from './components/BaseButton'
import mainStore from './store/store'
import axios from 'axios'

axios.defaults.baseURL =
  'https://couch-finder-51ae1-default-rtdb.firebaseio.com'

const app = createApp(App)
const store = createStore(mainStore)

app.component('base-button', BaseButton)

app.use(store)
app.mount('#app')
