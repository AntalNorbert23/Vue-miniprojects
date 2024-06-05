<template>
    <div class="project" :class="{complete: prop.project.complete}">
        <div class="actions">
            <h3 @click="showDetails">{{ prop.project.title}}</h3>
            <div class="icons">
                <span class="material-icons tick" @click="toggleComplete">done</span>
                <span class="material-icons"@click="deleteProject">delete</span>
                <router-link :to="{name:'EditProject',params:{id:prop.project.id }}"><span class="material-icons">edit</span></router-link>
            </div>
        </div>
        <div class="details" v-show="detailsVisible">
            <p>{{ prop.project.details }}</p>
        </div>
    </div>

</template>
    
<script setup>
    import { ref } from 'vue';
    const prop= defineProps(['project'])
    const emit = defineEmits(['delete','complete']);
    const detailsVisible=ref(false);
    const url=`http://localhost:3000/projects/${prop.project.id}`;

    const showDetails=()=>{
        detailsVisible.value=!detailsVisible.value
    }

    const deleteProject=()=>{
        fetch(url,{method:'DELETE'})
        .then(()=>emit('delete',prop.project.id))
        .catch(error=>console.log(error.message))
    }

    const toggleComplete=()=>{
        fetch(url,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({complete: !prop.project.complete})
        }).then(()=>{
            emit('complete',prop.project.id)
        }).catch((error)=>{console.log(error.message)})
    }
</script>

<style scoped>
    .project{
        margin:20px auto;
        background-color: white;
        padding: 10px 20px;
        border-radius:4px;
        box-shadow:1px 2px 3px rgba(0,0,0,0.05);
        border-left:4px solid #e90074;
    }
    h3{
        cursor:pointer;
    }
    .actions{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .material-icons{
        font-size:24px;
        margin-left:10px;
        color:#bbb;
        cursor:pointer;
    }
    .material-icons:hover{
        color:#777;
    }
    .project.complete{
        border-left:4px solid #00ce89;
    }
    .project.complete .tick{ 
        color:#00ce89;
    }
</style>