import { ref, computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';
//firebase imports
import { DB } from '@/firebase/config';
import { updateDoc,doc } from 'firebase/firestore';

//composable imports
import useCollection from './useCollection';

//composable usage
const {setTypingStatus} =useCollection();

export function useChat(documents, user,props,message,file,fileName) {
  const showEmojiPicker=ref(false);

  //format the documents from the firebase
  const formattedDocuments = computed(() =>
    documents?.value?.map(doc => ({
      ...doc,
      createdAt: formatDistanceToNow(doc.createdAt.toDate()),
    }))
  );  

  //function to mark the chat message as seen if user saw it
  const markAsSeen = async (messageDoc) => {
    if (messageDoc.status !== 'seen' && messageDoc.uid !== user.value.uid) {
        const messageRef = doc(DB, `chat_${props.chatId}/${messageDoc.id}`);

        try {
            await updateDoc(messageRef, { status: 'seen' });
        } catch (error) {
            console.error('Failed to mark message as seen:', error);
        }
    }
  };

  //add the class of the message based on user
  const messageClass = (message) => (message.uid === user.value.uid ? 'outgoing' : 'incoming');

  //function to check if the file is an image
  const isImage = (url) => /\.(jpeg|jpg|gif|png|bmp|webp)$/i.test(decodeURIComponent(url).split('?')[0]);

  //set the typing status
  const handleTyping=()=>{
    setTypingStatus(user.value);
  }

  //toggle the visibility of emojiPicker
  const toggleEmojiPicker = () => {
      showEmojiPicker.value = !showEmojiPicker.value;
  };

  //if clicked on the emoji read the code of emoji and add it to the messages value (in the textarea)
  const handleEmojiClick = (event) => {
    if (!message) {
      console.error("Message ref is not defined!");
      return;
    }
      const emoji=event.detail.unicode;
      message.value+=emoji;
      showEmojiPicker.value = false;
  };

  //handle file change trigger the file input if there is a file and add the file name in the textarea
  const handleFileChange = (event) => {
      file.value = event.target.files[0];
      fileName.value = file.value ? file.value.name : '';
      message.value = `Selected file: ${fileName.value}`; 
  };

  //if clicked outside the emoji picker close the emoji picker
  const handleClickOutside=(event)=>{
      const picker=document.querySelector('.emoji-picker');
      const button=document.querySelector('.emoji-button');

      if(picker && !picker.contains(event.target) &&!button.contains(event.target)){
        showEmojiPicker.value=false;
      }
  };


  return { 
            formattedDocuments,
            markAsSeen, 
            messageClass, 
            isImage, 
            handleTyping, 
            toggleEmojiPicker, 
            handleEmojiClick, 
            handleFileChange,
            showEmojiPicker,
            handleClickOutside 
          };
}
