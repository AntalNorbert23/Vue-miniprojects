<template>
  <div v-if="isLoggingOut" class="loader-container">
      <Loader size="large" fullPage />
    </div>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { AUTH } from '@/firebase/config';
import useNotificationHandler from '@/composables/useNotificationHandler';
import useActivityTracking from '@/composables/useActivityTracking';
import Loader from './components/Loader.vue';

import { useLoader } from './composables/useLoading';
const { isLoggingOut } =useLoader();

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

<style scoped>
  .loader-container{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        background-color: rgba(128, 128, 128, 0.697);
        z-index: 1;
        display:flex;
        justify-content: center;
        align-items: center;
    }
</style>