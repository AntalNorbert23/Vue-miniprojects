
<template>
  <main class="home">
      <div v-if="projects.length">
          <div v-for="project in projects" :key="project.id">
              <SingleProject :project="project" @delete="handleDelete" @complete="handleComplete"/>
          </div>
      </div>
  </main>
</template>

<script setup>
  import { ref,onMounted } from 'vue';
  import SingleProject from '../components/SingleProject.vue'
  
  const projects=ref([]);

  const handleDelete=(projectID)=>{
    projects.value=projects.value.filter((project)=>{
      return project.id !==projectID
    })
  }

  const handleComplete=(projectsID)=>{
    let p =projects.value.find(project=>{
      return project.id === projectsID 
    })
    p.complete=!p.complete
    
  }

  onMounted(()=>{
    fetch('http://localhost:3000/projects')
    .then(response=>response.json())
    .then(data=>projects.value=data)
    .catch(error=>console.log(error.message))
  })
</script>