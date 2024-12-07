
import { ref } from 'vue';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { DB, AUTH } from '@/firebase/config';
import useNotification from '@/composables/useNotification';

export default function useNotificationHandler() {
    const user = ref(AUTH.currentUser);
    let unsubscribe = null;
  
    const { requestNotificationPermission, showNotification } = useNotification();


    const requestPermissionAndListen = () => {
      requestNotificationPermission();
      listenForNotifications();
    }
 
    const listenForNotifications = () => {
      if (!user.value || !user.value.uid) return;
  
      const notificationsRef = collection(DB, 'notifications');
      const q = query(notificationsRef, 
        where('recipientId', '==', user.value.uid), 
        where('read', '==', false)
      );
  
      unsubscribe = onSnapshot(q, handleNotificationChanges);
    }
  
    const handleNotificationChanges = (snapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const notification = change.doc.data();
          
          showNotification(notification.title, {
            body: notification.body,
            onClick: () => {
              router.push({ name: 'chatroom', params: { chatId: notification.chatId } });
            }
          });
  
          markAsRead(change.doc.id);
        }
      });
    }
  
    const markAsRead = async (notificationId) => {
      try {
        const notificationDocRef = doc(DB, 'notifications', notificationId);
        await updateDoc(notificationDocRef, { read: true });
      } catch (error) {
        console.error('❌ Failed to mark notification as read:', error);
      }
    }
  
    const stopListeningForNotifications = () => {
      if (unsubscribe) unsubscribe();
    }
  
    return {
      requestPermissionAndListen,
      listenForNotifications,
      stopListeningForNotifications,
    };
  }
