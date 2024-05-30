
<template>
    <h1 class="titleReaction">Reaction Timer</h1>
    <div class="startButtondiv">
      <button @click="startGame"  :disabled="isPlaying" class="startButton">
          Play
      </button>
    </div>
    <Block v-if="isPlaying" :delay="delay" @end="endGame"/>
    <Results v-if="showResults" :score="score"/>
</template>

<script setup>
    import { ref } from 'vue';
    import Block from './components/Block.vue';
    import Results from './components/Results.vue';

    const isPlaying=ref(false);
    const delay=ref(null);
    const score=ref(null)
    const showResults=ref(false);

    const startGame=()=>{
        delay.value=2000 + Math.random() *5000
        isPlaying.value=true;
    }

    const endGame=(reactionTime)=>{
        score.value=reactionTime;
        isPlaying.value=false;
        showResults.value=true;
    }
</script>

<style scoped>
    .titleReaction{
        text-align: center;
    }
    .startButtondiv{
        display: flex;
        justify-content: center;
    }
    .startButton{
        background: #0faf87;
        color: white;
        padding: 8px 16px;
        font-size: 16px;
        letter-spacing: 1px;
        cursor: pointer;
        margin: 10px;
    }
    .startButton[disabled]{
        opacity: 0.2;
        cursor: not-allowed;
    }
</style>
