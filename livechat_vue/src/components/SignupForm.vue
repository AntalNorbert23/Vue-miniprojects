<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" required placeholder="Display name" v-model="displayName">
        <input type="email" required placeholder="E-mail" v-model="email">
        <input type="password" required placeholder="Password" v-model="password">
        <button>
            Sign up
        </button>
   </form>
</template>

<script setup>
    import { ref } from 'vue';
    
    const displayName=ref('');
    const email=ref('');
    const password=ref('');

    const handleSubmit=()=>{
        
    }


</script>