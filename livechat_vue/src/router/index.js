import Welcome from '@/views/Welcome.vue'
import ChatRoom from '@/views/chatRoom.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { AUTH } from '@/firebase/config';
import AvailableUsers from '@/components/AvailableUsers.vue';
import { useLoader } from '@/composables/useLoading';
const { setLoading } = useLoader();

//route guard-AUTH
const requireAuth=(to,from,next)=>{
  let user=AUTH.currentUser;
  if(!user){
    next({name:'welcome'});
  }else{
    next();
  }
  
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'welcome', component: Welcome},
    {path:'/chatsAvailable',name:'availableusers',component:AvailableUsers,beforeEnter:requireAuth},
    { path: '/chatroom/:chatId', name: 'chatroom', component: ChatRoom,beforeEnter:requireAuth,props:true},
  ]
})

router.beforeEach((to,from,next)=>{
  setLoading(true);
  next();
})

router.afterEach(()=>{
  setLoading(false);
})

export default router
