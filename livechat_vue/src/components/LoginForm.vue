<template>
    <form @submit.prevent="handleSubmit">
        <input type="email" required placeholder="E-mail" v-model="email">
        <input type="password" required placeholder="Password" v-model="password">
        <button>
            Log in
        </button>
   </form>
</template>

<script setup>
    import { ref } from 'vue';
    
    const email=ref('');
    const password=ref('');

    const handleSubmit=()=>{
        
    }


</script>