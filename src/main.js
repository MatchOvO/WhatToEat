import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue'
import './assets/stylesheets/reset.css'
import './assets/font/font.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
