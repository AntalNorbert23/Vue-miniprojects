import Welcome from '@/views/Welcome.vue'
import ChatRoom from '@/views/chatRoom.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { AUTH } from '@/firebase/config';

//route guard-AUTH

const requireAuth=(to,from,next)=>{
  let user=AUTH.currentUser;
  if(!user){
    next({name:'welcome'});
  }else{
    next();
  }
  
}

//route guard-login
const requireNoAuth=(to,from,next)=>{
  let user=AUTH.currentUser;
  if(user){
    next({name:'chatroom'});
  }else{
    next();
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'welcome', component: Welcome,beforeEnter:requireNoAuth},
    { path: '/chatroom', name: 'chatroom', component: ChatRoom,beforeEnter:requireAuth},
  ]
})

export default router
