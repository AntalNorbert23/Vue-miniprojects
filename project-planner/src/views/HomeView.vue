
<template>
  <main class="home">
      <div v-if="projects.length">
          <div v-for="project in projects" :key="project.id">
              <SingleProject :project="project"/>
          </div>
      </div>
  </main>
</template>

<script setup>
  import { ref,onMounted } from 'vue';
  import SingleProject from '../components/SingleProject.vue'
  
  const projects=ref([])

  onMounted(()=>{
    fetch('http://localhost:3000/projects')
    .then(response=>response.json())
    .then(data=>projects.value=data)
    .catch(error=>console.log(error.message))
  })
</script>