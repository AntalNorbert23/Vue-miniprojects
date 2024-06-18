<template>
    <form>
        <textarea 
            placeholder="Type a message and hit enter to send..."
            v-model="message"
            @keypress.enter.prevent="handleSubmit"
        >
        </textarea>
        <div class="error">{{ error }}</div>
    </form>
</template>

<script setup>
    import { ref } from 'vue';

    import {timestamp} from '@/firebase/config'
    
    import getUser from '@/composables/getUser'
    const { user }=getUser();

    import useCollection from'@/composables/useCollection'
    const { addDocToCollection, error }=useCollection('messages');

    const message=ref('');

    const handleSubmit=async ()=>{
        const chat={
            message:message.value,
            name:user.value.displayName,
            createdAt:timestamp()
        }

        await addDocToCollection(chat);

        if(!error.value){
            message.value='';
        }
        
    }
</script>

<style scoped>
    form{
        margin:10px;
    }
    textarea{
        width:100%;
        max-width:100%;
        margin-bottom:6px;
        padding:10px;
        box-sizing:border-box;
        border:0;
        border-radius:20px;
        font-family: inherit;
        outline:none;
    }
</style>