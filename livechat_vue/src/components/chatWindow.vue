<template>
    <div class="chat-window">
        <div v-if="error">
            {{ error }}
        </div>
        <div v-if="documents"
            class="messages"
            ref="messages"
        >
            <div v-for="doc in formattedDocuments" :key="doc.id" class="single" :class="messageClass(doc)">
                <span class="created-at">{{ doc.createdAt }}</span>
                <span class="name">{{ doc.name }}</span>
                <span class="message">{{ doc.message }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed,ref,onUpdated } from 'vue';

    import getCollection from '@/composables/getCollection';
    import { formatDistanceToNow } from 'date-fns';

    import getUser from '@/composables/getUser'
    const { user } = getUser();

    const { documents, error }=getCollection('messages');

    const messages=ref(null);
    

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