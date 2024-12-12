<template>
  <Loader />
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { AUTH } from '@/firebase/config';
import useNotificationHandler from '@/composables/useNotificationHandler';
import Loader from './components/Loader.vue';
import useActivityTracking from '@/composables/useActivityTracking';

const { trackExistingUser, stopTrackingActivity } = useActivityTracking();

onAuthStateChanged(AUTH, (user) => {
  if (user) {
    // If the user is already signed in, start tracking their activity
    trackExistingUser();
  } else {
    // If user is logged out, stop all tracking
    stopTrackingActivity();
  }
});

const { requestPermissionAndListen, stopListeningForNotifications } = useNotificationHandler();

onMounted(() => {
  requestPermissionAndListen(); 
});

onUnmounted(() => {
  stopListeningForNotifications(); 
});
</script>