<template>
  <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
  </div>
</template>

<script setup>
    import { useLoader } from '@/composables/useLoading';
    const {isLoading} = useLoader();

</script>
<style scoped>
    .loader-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(107, 101, 101, 0.7);
        z-index: 1000;
    }
    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #0000ff;
        width: 100px;
        height: 100px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>