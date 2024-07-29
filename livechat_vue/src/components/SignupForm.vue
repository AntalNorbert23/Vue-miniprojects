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
    import { ref } from 'vue';
    import useSignup from '@/composables/useSignup';

    const { error, signUp }=useSignup();

    const emit=defineEmits(['signup']);
      
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