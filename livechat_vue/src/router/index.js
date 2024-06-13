import Welcome from '@/views/Welcome.vue'
import ChatRoom from '@/views/chatRoom.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'welcome', component: Welcome},
    { path: '/chatroom', name: 'chatroom', component: ChatRoom},
  ]
})

export default router
