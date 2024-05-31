<template>
    <div class="project">
        <div class="actions" @click="showDetails ">
            <h3>{{ prop.project.title}}</h3>
            <div class="icons">
                <span class="material-icons">done</span>
                <span class="material-icons">edit</span>
                <span class="material-icons">delete</span>
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
    const detailsVisible=ref(false);

    const showDetails=()=>{
        detailsVisible.value=!detailsVisible.value
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
</style>