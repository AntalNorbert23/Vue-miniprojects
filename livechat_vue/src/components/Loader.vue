<template>
    <div 
      :class="loaderClasses"
      :style="loaderStyles"
    ></div>
  </template>
  
  <script setup>
      import { computed } from 'vue';
  
      const { size, fullPage, color, speed } = defineProps({
      size: {
          type: String,
          default: 'medium',
          validator: value => ['small', 'medium', 'large'].includes(value)
      },
      fullPage: {
          type: Boolean,
          default: false
      },
      color: {
          type: String,
          default: '#3498db'
      },
      speed: {
          type: [Number, String],
          default: 2
      }
      });
  
     const loaderClasses = computed (()=>({
          loader: true,
          'loader--small': size === 'small',
          'loader--medium': size === 'medium',
          'loader--large': size === 'large',
          'loader--full-page': fullPage,
     }));
  
     const loaderStyles = computed(()=>({
          borderTopColor: color,
          animationDuration: `${speed}`
     }))
  
  </script>
  
  <style scoped>
      .loader {
          border: 8px solid #f3f3f3;
          border-radius: 50%;
          border-top: 8px solid #3498db; 
          animation: spin 2s linear infinite; 
      }
      .loader--small {
          width: 30px;
          height: 30px;
          border-width: 4px;
      }
      .loader--medium {
          width: 60px;
          height: 60px;
          border-width: 6px;
      }
      .loader--large {
          width: 100px;
          height: 100px;
          border-width: 8px;
      }
      .loader--full-page {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
      }
      @keyframes spin {
          0% { transform: rotate(0deg) }
          100% { transform: rotate(360deg) }
      }
  </style>