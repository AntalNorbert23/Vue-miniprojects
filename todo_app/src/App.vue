<template>
    <main class="app">
        <section class="greeting">
            <h2 class="title"> What's up <input type="text"
                                          placeholder="Name here"
                                          v-model="name"
               ></h2>
        </section>

        <section class="create-todo"> 
            <h3>Create a todo</h3>

            <form>
                <h4>What's on your todo list?</h4>
                <input type="text" placeholder="e.g: Walk my dog" v-model="inputContent" id="content">

                <h4>Pick a category</h4>

                <div class="options">

                  <label>
                      <input 
                      type="radio" 
                      name="category"
                      id="category1"  
                      value="Business" 
                      v-model="inputCategory"
                      >
                      <span class="bubble business"></span>
                     <div>Business</div>
                  </label>


                  <label>
                      <input 
                      type="radio" 
                      name="category" 
                      id="category2"
                      value="Personal" 
                      v-model="inputCategory"
                      >
                      <span class="bubble personal"></span>
                     <div>Personal</div>
                  </label>

                </div>

                <input type="submit" value="Add todo"  @click="addTodo">
             </form>
        </section>
    </main>
</template>

<script setup>
    import { onMounted, ref, computed, watch } from 'vue';

    const todos=ref([]);
    const name=ref('');

    const inputContent=ref('');
    const inputCategory=ref(null);


    const sortTodos= computed(()=>{
        todos.value.sor((a,b)=>{return a.createdAt-b.createdAt})
    })

    watch(todos, (newTodo)=>{
        localStorage.setItem("todos",JSON.stringify(newTodo));
    },{deep:true})

    watch(name, (newValue)=>{
        localStorage.setItem("name", newValue) || '';
    })
    onMounted(()=>{
        name.value=localStorage.getItem('name');
    })

    const addTodo =()=>{
        if (inputContent.value.trim()==="" || inputCategory.value===null){
          return;
        }else{
          todos.value.push({
            content:inputContent.value,
            category:inputCategory.value,
            createdAt:new Date().getTime(),
            done:false
          })
        }
    }
</script>