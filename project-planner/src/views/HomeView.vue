
<template>
  <main class="home">
    <FilterNav @filterChange="current=$event" :current="current"/>
      <div v-if="projects.length">
          <div v-for="project in filteredProjects" :key="project.id">
              <SingleProject :project="project" @delete="handleDelete" @complete="handleComplete"/>
          </div>
      </div>
  </main>
</template>

<script setup>
  import { ref,onMounted,computed } from 'vue';
  import SingleProject from '../components/SingleProject.vue';
  import FilterNav from '../components/filterNav.vue';
  
  const projects=ref([]);
  const current=ref('all')

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
  
  const filteredProjects=computed(()=>{
      if(current.value === 'completed'){
          return projects.value.filter(project=> project.complete);
      }
      if(current.value === 'ongoing'){
          return projects.value.filter(project=> !project.complete);
      }

      return projects.value;
  })
  onMounted(()=>{
    fetch('http://localhost:3000/projects')
    .then(response=>response.json())
    .then(data=>projects.value=data)
    .catch(error=>console.log(error.message))
  })
</script>