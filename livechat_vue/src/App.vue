<template>
  <router-view/>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { DB } from '@/firebase/config';
import { AUTH } from '@/firebase/config';
import { useRouter } from 'vue-router';

import useNotification from '@/composables/useNotification';
const {showNotification, requestNotificationPermission } = useNotification();

const router = useRouter();
let unsubscribe = null;

const user = ref(AUTH.currentUser);
const inactivity_timer = 5 * 60 * 1000; 

let activityTimeout;

const setActive = async () => {
  if (user.value) {
    const userDocRef = doc(DB, 'users', user.value.uid);
    await updateDoc(userDocRef, { online: true });
  }
};

const setInactive = async () => {
  if (user.value) {
    const userDocRef = doc(DB, 'users', user.value.uid);
    await updateDoc(userDocRef, { online: false });
  }
};

const resetActivityTimeout = () => {
  clearTimeout(activityTimeout);
  setActive();
  activityTimeout = setTimeout(setInactive, inactivity_timer);
};

const trackActivity = () => {
  window.addEventListener('mousemove', resetActivityTimeout);
  window.addEventListener('keypress', resetActivityTimeout);
  window.addEventListener('scroll', resetActivityTimeout);
};

const stopTrackingActivity = () => {
  window.removeEventListener('mousemove', resetActivityTimeout);
  window.removeEventListener('keypress', resetActivityTimeout);
  window.removeEventListener('scroll', resetActivityTimeout);
};

onMounted(() => {
  requestNotificationPermission();
  setActive(); 
  trackActivity(); 
  resetActivityTimeout(); 

  if (user.value) {
    const notificationsRef = collection(DB, 'notifications');
    const q = query(notificationsRef, where('recipientId', '==', user.value.uid), where('read', '==', false));

    unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const notification = change.doc.data();

          showNotification(notification.title, {
            body: notification.body,
            data: { chatId: notification.chatId },
            onClick: () => {
              router.push({ name: 'chatroom', params: { chatId: notification.chatId } });
            }
          });

          
          const notificationDocRef = doc(DB, 'notifications', change.doc.id);
          updateDoc(notificationDocRef, { read: true });
        }
      });
    });
  }
});

onUnmounted(() => {
  stopTrackingActivity();
  clearTimeout(activityTimeout); 
  setInactive();
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>