<template>
    <div class="block" v-if="showBLock" @click="stopTimer">
        Click me
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const showBLock=ref(false);
    const timer=ref(null);
    const reactionTime=ref(0);

    const props=defineProps({
        delay:Number,
    });
    const emit =defineEmits(['end']);

    const startTimer=()=>{
        timer.value=setInterval(()=>{
            reactionTime.value+=10;
        },10)
    };
    const stopTimer=()=>{
        clearInterval(timer);
        emit('end',reactionTime.value);
    };

    onMounted(()=>{
        setTimeout(() => {
            showBLock.value=true;
            startTimer(); 
        }, props.delay);
    });

        
</script>

<style scoped>
    .block{
        width:400px;
        border-radius:20px;
        background-color: #0faf87;
        color:white;
        text-align: center;
        padding: 100px 0;
        margin:40px auto;
    }
</style>