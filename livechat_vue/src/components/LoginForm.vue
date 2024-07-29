<template>
    <form @submit.prevent="handleSubmit">
        <input type="email" required placeholder="E-mail" v-model="email">
        <div class="password-container">
            <input :type="passwordInputType" required placeholder="Password" v-model="password">
            <span class="fa fa-eye" @click="togglePasswordVisibility"></span>
        </div>

        <div class="error" v-if="error">{{ error.message }}</div>
        <button>
            Log in
        </button>
   </form>
</template>

<script setup>
    import { ref,computed } from 'vue';
    import useLogin from '@/composables/useLogin';
    
    const email=ref('');
    const password=ref('');
    const emit=defineEmits(['login']);

    const passVisible=ref(false);

    const { error,login }=useLogin();

    const passwordInputType=computed(()=>{
        return passVisible.value ? 'text' : 'password';
    })

    const togglePasswordVisibility=()=>{
        passVisible.value=!passVisible.value
    }

    const handleSubmit= async ()=>{
        await login(email.value, password.value);
        if(!error.value){
            emit('login');
        }
    }


</script>

<style>
    .password-container {
        position: relative;
    }
    .password-container .fa-eye {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #888;
}
</style>