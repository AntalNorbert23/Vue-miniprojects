<template>
    <div class="container">
        <navbar/>
        <chatWindow/>
        <newChatForm/>
    </div>
</template>

<script setup>
    import navbar from '@/components/navbar.vue'
    import getUser from '@/composables/getUser';

    import newChatForm from '@/components/newChatForm.vue';
    import chatWindow from '@/components/chatWindow.vue';

    import { watch } from 'vue';

    import { useRouter } from 'vue-router';
    const router=useRouter();


    const{ user }=getUser(); 

    watch(user,()=>{
        if(!user.value){
            router.push({name:'welcome'});
        }
    })
</script>