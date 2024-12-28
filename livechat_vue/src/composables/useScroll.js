import { ref, watchEffect,onBeforeUnmount } from 'vue';

export function useScroll(messages,formattedDocuments) {
 
  const isAtBottom = ref(true);

  const checkIfAtBottom = () => {
    if (!messages.value) return;
    
    isAtBottom.value =
      messages.value.scrollTop + messages.value.clientHeight >= messages.value.scrollHeight;
  };

  watchEffect(() => {
      if (!messages.value || !formattedDocuments.value) return;
      const shouldScroll = isAtBottom.value; // check if user is at the bottom

      // scroll only if the user is at the bottom
      if (shouldScroll ) {
          messages.value.scrollTop = messages.value.scrollHeight;
      }
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
