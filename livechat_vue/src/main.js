import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { AUTH } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

import App from './App.vue'
import router from './router'

let app;

onAuthStateChanged(AUTH,()=>{
    if (!app){
        app=createApp(App);
        app.use(createPinia())
        app.use(router)

        app.mount('#app')
    }
})


