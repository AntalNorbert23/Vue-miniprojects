
<template>
    <div v-if="isLoading" class="loader-container">
        <Loader  size="small" />
    </div>
    <ul>
        <!-- Show the user list to the logged user so it can chat with the user showed ( all users thhat have account) -->
        <li v-for="otherUser in filteredUsers" :key="otherUser.id" @click="handleEnterChat(otherUser.id)">
          {{ otherUser.displayName }}
    
          <span v-if="otherUser.online" class="online-indicator">Online</span>
          <span v-else class="offline-indicator">Offline</span>
        </li>
    
    </ul>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();

    import getUser from '@/composables/getUser.js';
    import { fetchUsers, filteredUsers } from '@/composables/useUsers';
    import Loader from './Loader.vue';

    import { useLoader } from '@/composables/useLoading';
    const { isLoading } = useLoader();

    //fetching users list
    fetchUsers();
    const { user } = getUser();

     // function that handles entering the chat
     const handleEnterChat = (otherUserId) => {
        const chatId = [user.value.uid, otherUserId].sort().join('_');
        router.push({ name: 'chatroom', params: { chatId } });
    };
</script>

<style scoped>
    .loader-container-big{
      position:fixed;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        background-color: rgba(128, 128, 128, 0.697);
        z-index: 1;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .loader-container{
        display:flex;
        justify-content: center;
        align-items: center;
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