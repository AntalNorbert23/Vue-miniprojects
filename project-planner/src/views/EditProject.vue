<template>
     <form @submit.prevent="handleSubmit">
        <label>Title:</label>
        <input type="text" required v-model="title">
        <label>Details:</label>
        <textarea required v-model="details"></textarea>
        <button>Update Project</button>
    </form>

    <p v-show="showSucces" class="success">{{ success }}</p>
</template>

<script setup>
    import { ref,onMounted } from 'vue';
    import router from '@/router';

    const props=defineProps(['id']);

    const title=ref('');
    const details=ref('');
    const success='Project successfully updated';
    const showSucces=ref(false);
    const url=`http://localhost:3000/projects/${props.id}`

    const handleSubmit=()=>{
        fetch(url,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title.value, details:details.value})
        })
        .then(()=>{
            showSucces.value=true;
            setTimeout(() => {
                router.push('/');
            }, 2000);
            
        }).catch(error=>console.log(error))
    }

    onMounted(()=>{
        fetch(url)
            .then(response=>response.json())
            .then(data=>{
                title.value=data.title;
                details.value=data.details;

            })
    })
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
    .success{
        display: flex;
        justify-content: center;
        color:#00ce89;
    }
</style>