<template>
    <div class="chat-window">
        <UserStatus/>
       
        <div v-if="isLoading" class="loader-container">
            <Loader />
        </div>

        <div v-else-if="documents && documents.length>0"
            class="messages"
            ref="messages"
        >
            <div v-for="(doc,index) in formattedDocuments" :key="doc.id" class="single" :class="messageClass(doc)" @mouseenter="markAsSeen(doc)" :ref="el => { messageRefs[index] = el }">
                <span class="created-at">{{ doc.createdAt }}</span>
                <span class="name">{{ doc.name }}</span>
                <span class="message" v-if="!doc.fileURL">{{ doc.message }}</span>
                <span v-if="doc.uid === currentUser.uid" class="status">{{ doc.status }}</span>
                <div>
                    <ImageItem :doc="doc"/>
                </div>
            </div>
        </div>
        <EmptyState v-else/>
        <TypingIndicator :typingUsers="typingUsers"/>
    </div>
    <div v-if="error">
            {{ error }}
    </div>
</template>

<script setup>
    //components import
    import UserStatus from './UserStatus.vue';
    import Loader from '@/components/Loader.vue'
    import EmptyState from './EmptyState.vue';
    import TypingIndicator from './TypingIndicator.vue';
    import ImageItem from './ImageItem.vue';

    //vue imports
    import { computed,ref,watchEffect, onMounted } from 'vue';

    //composables import
    import getCollection from '@/composables/getCollection';
    import { useChat } from '@/composables/useChat';
    import { useLoader } from '@/composables/useLoading';
    import { useUsers } from '@/composables/useUsers';
    import getUser from '@/composables/getUser'
    import { useScroll } from '@/composables/useScroll';
    import { useObserver } from '@/composables/useObserver';

    //props
    const props=defineProps({
        chatId:String
    });

    //destructuring composables
    const { user } = getUser();
    const { isLoading } = useLoader();
    const { documents, error,typingUsers }=getCollection(`chat_${props.chatId}`);
    const { formattedDocuments,markAsSeen,messageClass } =useChat(documents,user,props);
    const {fetchUsers}=useUsers();
    const messages = ref(null);
   
    //constants
    const currentUser = computed(() => user.value);
    const messageRefs = ref([]); 

    //watcheffect
    watchEffect(() => {
        if (documents.value) {
            isLoading.value = false; // Stop loader
        } else {
            isLoading.value = true; // Show loader
        }
    });

    onMounted(() => {
        fetchUsers();
        useScroll(messages,formattedDocuments);
        useObserver(messageRefs,formattedDocuments,markAsSeen);
    });

</script>

<style scoped>
    .chat-window{
        background-color: #fafafa;
        padding:30px 20px;
    }
    .loader-container{
        display:flex;
        justify-content: center;
        align-items: center;
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
    .single .status {
        font-size: 0.8rem;
        color: gray;
        margin-top: 4px;
        display: block;
    }
    .single.outgoing .status {
        text-align: right;
        color: blue;
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
</style>