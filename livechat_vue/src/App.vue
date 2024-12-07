<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import useNotificationHandler from '@/composables/useNotificationHandler';

const { requestPermissionAndListen, stopListeningForNotifications } = useNotificationHandler();

onMounted(() => {
  requestPermissionAndListen(); 
});

onUnmounted(() => {
  stopListeningForNotifications(); 
});
</script>