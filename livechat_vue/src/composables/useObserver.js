import { watchEffect,onBeforeUnmount } from "vue";

export function useObserver(messageRefs,formattedDocuments,markAsSeen){

    // setting observer of new docs for marking seen the doc if the user saw it
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const doc = entry.target.__doc;
            if (doc) markAsSeen(doc);
          }
        });
    });

    //observer watching the documents (messages)
    watchEffect(() => {
        if (!formattedDocuments.value || formattedDocuments.value.length === 0) return;
        if (!messageRefs.value) {
            messageRefs.value = [];
        }
      
        messageRefs.value.forEach((messageEl, index) => {
            if (messageEl && !messageEl.__doc) {
              messageEl.__doc = formattedDocuments.value[index];
              observer.observe(messageEl);
            }
        });
    });

    onBeforeUnmount(()=>{
        if (observer) observer.disconnect();
        messageRefs.value = []; 
    })
}

