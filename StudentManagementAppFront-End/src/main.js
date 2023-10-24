import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import {createPinia} from "pinia";
const app = createApp(App)

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
