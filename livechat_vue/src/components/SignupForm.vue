<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" required placeholder="Display name" v-model="displayName">
        <input type="email" required placeholder="E-mail" v-model="email">
        <input type="password" required placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{ error.message }}</div>
        <button>
            Sign up
        </button>
   </form>
</template>

<script setup>
    //vue imports
    import { ref } from 'vue';

    //composable imports
    import useSignup from '@/composables/useSignup';

    //use composables
    const { error, signUp }=useSignup();

    //emits
    const emit=defineEmits(['signup']);
    
    //constants
    const displayName=ref('');
    const email=ref('');
    const password=ref('');

    const handleSubmit=async()=>{
        await signUp(email.value,password.value,displayName.value);
        if(!error.value){
            emit('signup');
        }
    }
    
</script>