<template>
    <form>
        <div class="textarea-container">
            <textarea 
                :placeholder="placeholderText"
                :class="{'placeholder-red': isPlaceholderRed}"
                v-model="message"
                @input="handleTyping"
                @keypress.enter.prevent="handleSubmit"
            >
            </textarea>
            <button @click.prevent="toggleEmojiPicker" class="emoji-button">😊</button>
            <button @click.prevent="triggerFileInput" class="upload-button">📷</button>
            <button @click.prevent="handleSubmit" class="send-button">Send</button>
            <input 
                type="file" 
                ref="fileInput"
                @change="handleFileChange"
                style="display: none;"
            />
            
            <div v-if="showEmojiPicker" class="emoji-picker">
                <emoji-picker  
                    @emoji-click="handleEmojiClick" 
                >
                </emoji-picker>
            </div>
        </div>
        <div class="error">{{ error }}</div>
    </form>
</template>


<script setup>
    //vue imports
    import { ref,onMounted,onBeforeUnmount} from 'vue';
    
    //firebase imports
    import {timestamp, storage} from '@/firebase/config';
    import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

    //emoji picker
    import 'https://cdn.skypack.dev/emoji-picker-element';

    //composable imports
    import getUser from '@/composables/getUser';
    import useNotification from '@/composables/useNotification';
    import { useChat } from '@/composables/useChat';
    import useCollection from'@/composables/useCollection'

    //props
    const props =defineProps({
        chatId:{
            type:String,
            required:true
        }
    })

    //composable usage
    const { user }=getUser();
    const { addNotification }=useNotification();
    const { addDocToCollection, error }=useCollection(`chat_${props.chatId}`);
    
    

    //constants
    const message=ref('');
    const fileName = ref('');
    const file = ref(null);
    const placeholderText = ref('Type a message and hit enter to send...');
    const isPlaceholderRed = ref(false);
    const fileInput = ref(null);
    
    const {
        handleTyping,
        toggleEmojiPicker,
        showEmojiPicker,
        handleEmojiClick,
        handleFileChange,
        handleClickOutside} = useChat(document,user,props,message,file,fileName);
    
    //handle submit of message
    const handleSubmit=async ()=>{

        if(message.value !==''){

            const participants=props.chatId ? props.chatId.split('_') : [];

            let chat={
                message:message.value,
                name:user.value.displayName,
                createdAt:timestamp(),
                uid:user.value.uid,
                participants,
                status:'sent'
            }

            //if there is a file then upload file to storage 
            if (file.value) {
                const fileRef = storageRef(storage, `chat_files/${Date.now()}_${file.value.name}`);
                const uploadResult = await uploadBytes(fileRef, file.value);
                const fileURL = await getDownloadURL(uploadResult.ref);
                chat = { ...chat, fileURL:fileURL, fileName: file.value.name };
                file.value = null;
                fileName.value = '';
            }
            await addDocToCollection(chat);

            const otherUser=participants.find(id =>id !== user.value.uid);
          
            //for the other user display the notification of new message
            if (otherUser){
                const notification = {
                    recipientId: otherUser,
                    title: 'New Message',
                    body: `${user.value.displayName} sent you a message.`,
                    chatId: props.chatId,
                    read: false,
                    createdAt: timestamp()
                };

            await addNotification(notification);  
            }

        } else{
            placeholderText.value = "No empty messages!";
            isPlaceholderRed.value = true;
            setTimeout(() => {
                placeholderText.value = "Type a message and hit enter to send...";
                isPlaceholderRed.value = false;
            }, 3000);
        }
        
        if(!error.value){
            message.value='';
        }  
    }

    const triggerFileInput = () => {
        fileInput.value.click();
    };

    onMounted(()=>{
        document.addEventListener('click', handleClickOutside);
    })

    onBeforeUnmount(()=>{
        document.removeEventListener('click',handleClickOutside);
    })
       
</script>

<style scoped>
    form{
        margin:10px;
    }
    textarea{
        width:90%;
        max-width:100%;
        margin-bottom:6px;
        padding:12px;
        box-sizing:border-box;
        border:0;
        border-radius:20px;
        font-family: inherit;
        outline:none;
    }
    .textarea-container{
        display: flex;
        justify-content: flex-center;
        align-items: center;
        position: relative;
    }
    .send-button {
        border: none;
        margin-left:20px;
    }
    .emoji-button{
        padding:10px 12px;
        border-radius:50%;
        margin-left:10px;
    }
    .emoji-picker {
        position: absolute;
        bottom: 80px; 
        right: 30px; 
        width: 400; 
        height: 400px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: auto;
    }
    .placeholder-red::placeholder {
        color: red; 
    }
    .upload-button{
        padding:10px;
        margin-left:10px;
    }
</style>