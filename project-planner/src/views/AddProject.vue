<template>
    <form @submit.prevent="handleSubmit">
        <label>Title:</label>
        <input type="text" required v-model="title">
        <label>Details:</label>
        <textarea required v-model="details"></textarea>
        <button>Add Project</button>
    </form>
</template>

<script setup>
    import router from '@/router';
import { ref } from 'vue';

    const title=ref('');
    const details=ref('');

    const handleSubmit=()=>{
        let project={
            title:title.value,
            details:details.value,
            complete:false
        }
        
        fetch('http://localhost:3000/projects',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(project),
        }).then(()=>{
            router.push('/')
        }).catch((error)=>console.error(error.message))
    }
</script>

<style scoped>
    form{
        background-color: white;
        padding:20px;
        border-radius: 10px;
    }
    label{
        display: block;
        color:#bbb;
        text-transform: uppercase;
        font-size:14px;
        font-weight:bold;
        letter-spacing: 1px;
        margin:20px 0 10px 0;
    }
    input{
        padding:10px;
        border:0;
        border-bottom: 1px solid #ddd;
        width:100%;
        box-sizing: border-box;
    }
    textarea{
        border: 1px solid #ddd;
        padding:10px;
        width:100%;
        box-sizing: border-box;
        height:100px;
    }
    form button{
        display: block;
        margin: 20px auto 0;
        background-color: #00ce89;
        color:white;
        padding:10px;
        border:0;
        border-radius:6px;
        font-size:16px;
    }
</style>