<template>
  <div class="container">
    <Navbar/>
    <h2>Users</h2>
    <UserList />
  </div>
</template>

<script setup>
    import Navbar from './Navbar.vue';
    import UserList from './UserList.vue';
   
</script>

<style scoped>
    h2{
      padding:15px 10px 0 15px;
      text-align: center;
    }
</style>
