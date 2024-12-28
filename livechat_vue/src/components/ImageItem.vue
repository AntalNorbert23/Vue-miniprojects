<template>
    <div v-if="doc.fileURL">
        <div v-if="isImage(doc.fileURL)" >
            <a :href="doc.fileURL" target="_blank"><img :src="doc.fileURL" :alt="doc.fileName" class="chat-image"/></a>
        </div>
        <div v-else>
            <a :href="doc.fileURL" target="_blank">{{ doc.fileName }}</a>
        </div>
    </div>
</template>

<script setup>
    import { useChat } from '@/composables/useChat';

    const {isImage} =useChat();

    defineProps({
        doc:Object,
    })
</script>
<style scoped>
     .chat-image {
        width:300px;
        height: 50%;
        border-radius: 8px;
    }
</style>