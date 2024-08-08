<template>
    <div class="chat-window">
        <div v-if="loading" class="loader">
            <Loader />
        </div>
        <div v-else-if="documents && documents.length>0"
            class="messages"
            ref="messages"
        >
            <div v-for="doc in formattedDocuments" :key="doc.id" class="single" :class="messageClass(doc)">
                <span class="created-at">{{ doc.createdAt }}</span>
                <span class="name">{{ doc.name }}</span>
                <span class="message">{{ doc.message }}</span>
            </div>
        </div>
        <div v-else class="no_messages">
            <p>Type a message and press enter to start a conversation...</p>
        </div>
        <div v-if="typingUsers.length>0" class="typing_user">
            <span v-for="user in typingUsers" key="user.id">{{ user.name }} is typing...</span>
        </div>
    </div>
    <div v-if="error">
            {{ error }}
    </div>
</template>

<script setup>
    import Loader from '@/components/Loader.vue'

    import { computed,ref,onUpdated,watchEffect } from 'vue';

    import getCollection from '@/composables/getCollection';
    import { formatDistanceToNow } from 'date-fns';

    import getUser from '@/composables/getUser'
    const { user } = getUser();


    const props=defineProps({
        chatId:String
    });

    const { documents, error,typingUsers }=getCollection(`chat_${props.chatId}`);

    const messages=ref(null);
    const loading = ref(true); 

    watchEffect(()=>{
        if(documents.value!==null){
            loading.value=false;
        }
    })
    

    onUpdated(()=>{
        if(messages.value){
            messages.value.scrollTop=messages.value.scrollHeight;
        }
       
    })

    const formattedDocuments=computed(()=>{
        if (documents.value) {
            return documents.value.map(doc=>{
                let time= formatDistanceToNow(doc.createdAt.toDate())
                
                return { ...doc, createdAt:time }
            })
        }
    })

    const messageClass=(message)=>{
        return message.uid === user.value.uid ? 'outgoing' : 'incoming';
    }
</script>

<style scoped>
    .chat-window{
        background-color: #fafafa;
        padding:30px 20px;
    }
    .no_messages{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .typing_user{
        padding:20px;
    }
    .typing_user span{
        color:rgb(9, 23, 223);
        box-shadow:0 4px 6px rgb(178, 182, 231);
        border-radius: 5px;
        padding:5px;
    }
    .loader{
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .single{
        margin:18px 0;
    }
    .messages{
        max-height: 400px;
        display: flex;
        flex-direction: column;
        overflow:auto;
    }
    .single{
        margin:10px;
        padding:10px;
        border-radius: 10px;
        max-width:60%;
        word-wrap: break-word;
    }
    .incoming{
        background-color: #e0e0e0;
        align-self: flex-start;
    }
    .outgoing{
        background-color: #0084ff;
        color:white;
        align-self: flex-end;
    }
    .incoming .created-at {
        display:block;
        color:#999;
        font-size:12px;
        margin-bottom:4px;
        padding-left:2px;
    }
    .outgoing .created-at{
        display:block;
        color:#0b0101;
        font-size:12px;
        margin-bottom:4px;
        padding-left: 2px;
    }
    .name {
        font-weight:bold;
        margin-right:6px;
        padding-left:3px;
    }
    .messages{
        max-height:400px;
        overflow: auto;
    }
</style>