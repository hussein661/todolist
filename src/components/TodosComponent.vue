<template>
  <div class="container m-4">
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 px-4">
        <div :class="['border', colorClass, priorityClass]">
          <task-form  />
        </div>
      </div>
      <div class="w-full md:w-1/2 px-4">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1>My Tasks</h1>
          <input type="text" placeholder="Search..." v-model="searchTerm" class="search-field my-3 p-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <div
            v-for="(task, index) in tasks"
            :key="task.id"
            class="task-wrapper"
            
          >
          <div v-if="currentEditing != task.id" class="flex flex-wrap lg:flex-nowrap justify-between todo-item'">

            <div class="w-full lg:w-auto font-bold" :style="{color:task.color}">{{ task.description }}</div>
            <div class="w-full lg:w-auto ">{{ task.date }}</div>
            <div class="w-full lg:w-auto ">{{ task.priority }}</div>
            <!-- <div
            :style="{ background: task.color, width: '20px', height: '20px' }"
            ></div> -->
            <div class="flex-shrink-0">
              <button class="mx-2 edit-button" @click="()=>edit(task)">            <i class="material-icons">edit</i>
      <font-awesome-icon :icon="faEdit" /> 
</button>
              <button class="mx-2 delete-button" @click="() => deleteTask(index)">
                <i class="material-icons">delete</i>
      <font-awesome-icon :icon="faTrash" /> </button>
            </div>
          </div>
          <div v-else>
            <task-form :task="task" :edit="true" :index="index" @closeForm="()=>closeForm()" />
  
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed,ref } from "vue";
import { useStore } from "vuex";
import TaskForm from './TaskForm.vue';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default {
  components: { TaskForm },
  setup() {
    const store = useStore();
    const currentEditing = ref(0)
    const searchTerm = ref('')
    const edit = (task) =>{

      currentEditing.value = task.id
    }
    const closeForm = () =>{
      currentEditing.value = 0
    }
    const search = (event) =>{
      const value = event.target.value
      console.log('search for ' + value)
    }
    return {
      faEdit,
faTrash,
      searchTerm,
      search,
      closeForm,
      currentEditing,
      edit,
      tasks: computed(() => store.state.tasks.filter((task) =>{
        if(task && task.description){

         return task.description.toLowerCase().includes(searchTerm.value.toLowerCase())
        }
      }
      )),
      deleteTask: (id) => store.commit("deleteTask", id),
    };
  },
};
</script>

<style scoped>
input {
  border: none;
  outline: none;
}
.task-wrapper {
  padding: 13px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    background: #eaeaea59;
    margin: 10px 0;
}
</style>
