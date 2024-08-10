<template>
  <div class="container">
    <navbar/>
    <h2>Users</h2>
    <ul>
      <li v-for="otherUser in filteredUsers" :key="otherUser.id" @click="enterChat(otherUser.id)">
        {{ otherUser.displayName }}

        <span v-if="otherUser.online" class="online-indicator">Online</span>
        <span v-else class="offline-indicator">Offline</span>
      </li>
      
    </ul>
  </div>
</template>

<script setup>
    import navbar from './navbar.vue';
    import { ref, onMounted,computed } from 'vue';
    import { collection } from 'firebase/firestore';
    import { useRouter } from 'vue-router';
    import { DB } from "@/firebase/config";
    import { onSnapshot } from "firebase/firestore";
    import getUser from '@/composables/getUser.js';

    const users = ref([]);
    const router = useRouter();
    const { user } = getUser();

    const fetchUsers = async () => {
   
    const usersCollection = collection(DB, 'users');

    onSnapshot(usersCollection, (snapshot) => {
      users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });
    };



    const filteredUsers=computed(()=>{
      if(!users.value || !user.value) return ;
      return users.value.filter(otherUser=>otherUser.id !== user.value.uid)
    })

    const enterChat = (otherUserId) => {
        const chatId = [user.value.uid, otherUserId].sort().join('_');
        router.push({ name: 'chatroom', params: { chatId } });
    };

    onMounted(fetchUsers);
</script>

<style scoped>
    h2{
      padding:15px 10px 0 15px;
      text-align: center;
    }
    ul {
      list-style-type: none;
      padding: 15px;
    }
    li {
      cursor: pointer;
      padding: 10px;
      margin: 5px 0;
      border-radius:5px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
    }
    li:hover{
      background-color:  #00ffd0;
      font-weight: 800;
    }
    .online-indicator {
     color: green;
     margin-left: 10px;
    }
    .offline-indicator {
      color: red;
      margin-left: 10px;
    }
</style>
