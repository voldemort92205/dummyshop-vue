import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

/* dark mode in global styles */
import 'element-plus/theme-chalk/dark/css-vars.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(ElementPlus);
app.mount('#app');
