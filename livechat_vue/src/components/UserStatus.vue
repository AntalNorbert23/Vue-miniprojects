<template>
    <div class="user-status">
      <li
        v-for="otherUser in filteredUser"
        :key="otherUser.id"
      >
        <span :class="otherUser.online ? 'online-indicator' : 'offline-indicator'"></span>
        {{ otherUser.displayName }}
      </li>
    </div>
</template>
  
<script setup>
  //vue imports
  import { computed } from 'vue';

  //composables imports
  import { useUsers } from '@/composables/useUsers';
  import getUser from '@/composables/getUser'

  //router import 
  import { useRoute } from 'vue-router'
    
  //router usage
  const route =useRoute();
  const clickedUserId = route.query.otherUserId;

  //composables usage
  const { user } = getUser();
  const { users }=useUsers()

  const filteredUser=computed(()=>{
    if(!users.value || !user.value) return [];
  
    return users.value.filter(user=>user.id == clickedUserId);
  })
    
</script>
  
<style scoped>
    .user-status {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 10px;
        background-color: #f4f4f9;
        position: relative;
        top:-30px;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }
    .online-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #00cc66; 
        display: inline-block;
        margin-right: 8px;
    }
    li{
        display: inline;
    }
    .offline-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #cc0000; 
        display: inline-block;
        margin-right: 8px;
    }
</style>
  