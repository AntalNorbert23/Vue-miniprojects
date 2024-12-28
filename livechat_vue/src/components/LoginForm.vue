<template>
    <div v-if="isLoading" class="loader-container">
        <Loader fullPage size="large"/>
    </div>
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
    //component imports
    import Loader from './Loader.vue';

    //vue imports
    import { ref,computed } from 'vue';

    //composables imports
    import useLogin from '@/composables/useLogin';
    import { useLoader } from '@/composables/useLoading';

    //using composables
    const { isLoading,setLoading } =useLoader();
    const { error,login }=useLogin();

    //constants
    const email=ref('');
    const password=ref('');
    const passVisible=ref(false);

    //emits
    const emit=defineEmits(['login']);


    const passwordInputType=computed(()=>{
        return passVisible.value ? 'text' : 'password'; //type of text password or text based on passVisible value
    })

    const togglePasswordVisibility=()=>{
        passVisible.value=!passVisible.value; //toggle the value of passVisible from true to false and inverse
    }

    //handling submit
    const handleSubmit= async ()=>{
        setLoading(true);
        await login(email.value, password.value);
        setLoading(false)
        if(!error.value){
            emit('login');
        }
    }

</script>

<style scoped>
    .loader-container{
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