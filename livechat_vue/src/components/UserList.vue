
<template>
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