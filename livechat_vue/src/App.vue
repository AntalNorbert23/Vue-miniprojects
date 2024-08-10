<template>
  <router-view/>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import { DB } from '@/firebase/config';
import { AUTH } from '@/firebase/config';

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
  setActive(); 
  trackActivity(); 
  resetActivityTimeout(); 
});

onUnmounted(() => {
  stopTrackingActivity();
  clearTimeout(activityTimeout); 
});
</script>