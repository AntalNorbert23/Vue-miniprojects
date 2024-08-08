<template>
    <div class="container">
        <navbar/>
        <chatWindow :chatId="chatId"/>
        <newChatForm :chatId="chatId"/>
    </div>
</template>

<script setup>
    import navbar from '@/components/navbar.vue'
    import getUser from '@/composables/getUser';

    import newChatForm from '@/components/newChatForm.vue';
    import chatWindow from '@/components/chatWindow.vue';

    import { watch } from 'vue';

    import { useRouter, useRoute } from 'vue-router';
    const router=useRouter();
    const route = useRoute();
    const chatId=route.params.chatId;


    const{ user }=getUser(); 

    watch(user,()=>{
        if(!user.value){
            router.push({name:'welcome'});
        }
    })
</script>