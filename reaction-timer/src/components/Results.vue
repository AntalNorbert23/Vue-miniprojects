<template>
    <p class="reacttime">React time- {{ score }} ms</p>
    <p class="rank">{{ rank }}</p>
</template>

<script setup>
    import {computed} from 'vue';
    const props=defineProps({
        score:Number,
    });

    const rank=computed(() => {
        if (props.score < 250) {
            return 'Ninja reflexes!';
        } else if (props.score < 400) {
            return 'Great reflexes!';
        } else {
            return 'Snail reflexes...';
        }
    });
</script>

<style>
    .reacttime{
        text-align: center;
    }
    .rank{
        text-align: center;
        font-weight: bold;
        color:aqua;
        font-size: 1.4em;
    }
</style>