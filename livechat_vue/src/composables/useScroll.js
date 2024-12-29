import { ref, watchEffect, onBeforeUnmount, nextTick } from 'vue';

export function useScroll(messages,formattedDocuments,currentUser) {
 
  const isAtBottom = ref(true);
  const hasScrolledToBottomOnMount = ref(false);

  const checkIfAtBottom = () => {
    if (!messages.value) return;
    
    isAtBottom.value =
      messages.value.scrollTop + messages.value.clientHeight >= messages.value.scrollHeight;
  };

  const scrollToBottom = () => {
    if (messages.value) {
      messages.value.scrollTop = messages.value.scrollHeight;
    }
  };

  watchEffect(() => {
      if (!messages.value || !formattedDocuments.value) return;

      nextTick(()=>{
        const lastMessage = formattedDocuments.value[formattedDocuments.value.length - 1];
        const isMessageFromCurrentUser = lastMessage?.uid === currentUser.value.uid;

        if (!hasScrolledToBottomOnMount.value) {
          // scroll down for both the current user and the other user on first mount
          scrollToBottom();
          hasScrolledToBottomOnMount.value = true; // mark that we've scrolled on mount
        } else if (isAtBottom.value && isMessageFromCurrentUser) {
          // scroll down if it's from the current user and we are already at the bottom
          scrollToBottom();
        }
      })
      
  });

  if (messages.value) {
      messages.value.addEventListener('scroll', checkIfAtBottom);
  }

  onBeforeUnmount(() => {
    if (messages.value) {
        messages.value.removeEventListener('scroll', checkIfAtBottom);
    }
  });
 
}
