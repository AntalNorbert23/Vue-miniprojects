import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { AUTH } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

import App from './App.vue'
import router from './router'

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

let app;

onAuthStateChanged(AUTH,()=>{
    if (!app){
        app=createApp(App);
        app.use(createPinia())
        app.use(router)
        app.use(ToastPlugin)

        app.mount('#app')
    }
})


