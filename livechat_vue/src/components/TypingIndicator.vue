<template>
    <div v-if="typingUsers.length > 0" class="typing_user">
      <span v-for="user in typingUsers" :key="user.id">{{ user.name }} is typing...</span>
    </div>
</template>
  
<script setup>
  defineProps({
    typingUsers: Array,
  });
</script>
  
<style scoped>
  .typing_user {
    padding: 20px;
  }
  .typing_user span {
    color: rgb(9, 23, 223);
    box-shadow: 0 4px 6px rgb(178, 182, 231);
    border-radius: 5px;
    padding: 5px;
  }
</style>
  