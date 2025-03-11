import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import pinia from './store'
import router from './router'
import App from './App.vue'
import 'vant/lib/index.css'
import '@/assets/css/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
