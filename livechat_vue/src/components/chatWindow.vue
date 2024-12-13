<template>
    <div class="chat-window">
        <div v-if="isLoading" class="loader-container">
            <Loader />
        </div>
        <div v-else-if="documents && documents.length>0"
            class="messages"
            ref="messages"
        >
            <div v-for="doc in formattedDocuments" :key="doc.id" class="single" :class="messageClass(doc)">
                <span class="created-at">{{ doc.createdAt }}</span>
                <span class="name">{{ doc.name }}</span>
                <span class="message" v-if="!doc.fileURL">{{ doc.message }}</span>
                <div>
                    <div v-if="doc.fileURL">
                        <div v-if="isImage(doc.fileURL)" >
                            <a :href="doc.fileURL" target="_blank"><img :src="doc.fileURL" :alt="doc.fileName" class="chat-image"/></a>
                        </div>
                        <div v-else>
                            <a :href="doc.fileURL" target="_blank">{{ doc.fileName }}</a>
                        </div>
                    </div>
                </div>
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

    import { useLoader } from '@/composables/useLoading';
    const { isLoading } = useLoader();

    import getUser from '@/composables/getUser'
    const { user } = getUser();


    const props=defineProps({
        chatId:String
    });

    const { documents, error,typingUsers }=getCollection(`chat_${props.chatId}`);

    const messages=ref(null);

    watchEffect(() => {
        if (documents.value) {
            isLoading.value = false; // Stop loader
        } else {
            isLoading.value = true; // Show loader
        }
    });
    

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
        if(!user.value) return 
        return message.uid === user.value.uid ? 'outgoing' : 'incoming';
    }

    const isImage = (url) => {
        const decodedUrl = decodeURIComponent(url);

        return /\.(jpeg|jpg|gif|png|bmp|webp)$/i.test(decodedUrl.split('?')[0]);
    };
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
    .loader-container{
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
    .chat-image {
        width:300px;
        height: 50%;
        border-radius: 8px;
    }
</style>