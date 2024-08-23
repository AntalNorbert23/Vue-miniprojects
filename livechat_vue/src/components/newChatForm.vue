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
    import { ref,onMounted,onBeforeUnmount} from 'vue';
    import 'https://cdn.skypack.dev/emoji-picker-element';

    import {timestamp} from '@/firebase/config'
    
    import getUser from '@/composables/getUser'
    const { user }=getUser();

    import useNotification from '@/composables/useNotification';
    const { addNotification }=useNotification();

    import { storage } from '@/firebase/config';
    import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

    const props =defineProps({
        chatId:{
            type:String,
            required:true
        }
    })

    import useCollection from'@/composables/useCollection'
    const { addDocToCollection, error,setTypingStatus }=useCollection(`chat_${props.chatId}`);

    const message=ref('');
    const showEmojiPicker=ref(false);
    const placeholderText = ref('Type a message and hit enter to send...');
    const isPlaceholderRed = ref(false);
    const fileInput = ref(null);
    const fileName = ref('');
    const file = ref(null);


    const handleSubmit=async ()=>{
        if(message.value !==''){
            const participants=props.chatId ? props.chatId.split('_') : [];
            let chat={
                message:message.value,
                name:user.value.displayName,
                createdAt:timestamp(),
                uid:user.value.uid,
                participants:participants
            }

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

    const handleTyping=()=>{
        setTypingStatus(user.value);
    }

    const toggleEmojiPicker = () => {
        showEmojiPicker.value = !showEmojiPicker.value;
    };
    const handleEmojiClick = (event) => {
        const emoji=event.detail.unicode;
        message.value+=emoji;
        showEmojiPicker.value = false;
    };

    const handleFileChange = (event) => {
        file.value = event.target.files[0];
        fileName.value = file.value ? file.value.name : '';
        message.value = `Selected file: ${fileName.value}`; 
    };

    const triggerFileInput = () => {
        fileInput.value.click();
    };

    onMounted(()=>{
        document.addEventListener('click', handleClickOutside);
    })

    onBeforeUnmount(()=>{
        document.removeEventListener('click',handleClickOutside);
    })

    const handleClickOutside=(event)=>{
        const picker=document.querySelector('.emoji-picker');
        const button=document.querySelector('.emoji-button');
        if(picker && !picker.contains(event.target) &&!button.contains(event.target)){
            showEmojiPicker.value=false;
        }
    };
       
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