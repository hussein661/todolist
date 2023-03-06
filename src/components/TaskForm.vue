<template>
    <form
class="bg-white shadow-md rounded px-8 pt-6 pb-8"
@submit.prevent="submitForm"
>
<div class="mb-4">
  <label
    class="block text-gray-700 font-bold mb-2"
    for="description"
  >
    Task Description
  </label>
  <input
    v-model="description"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="description"
    type="text"
    placeholder="Enter task description"
  />
  <div v-if="textDescriptionError" class="error text-red-500">{{ textDescriptionError }}</div>

</div>
<div class="mb-4">
  <label class="block text-gray-700 font-bold mb-2" for="color">
    Color
  </label>
  <input
    v-model="color"
    class="w-full"
    id="color"
    type="color"
    placeholder="Enter task color"
  />
</div>
<div class="mb-4">
  <label class="block text-gray-700 font-bold mb-2" for="priority">
    Priority
  </label>
  <select
    v-model="priority"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="priority"
  >
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </select>
</div>
<div class="mb-4">
  <label class="block text-gray-700 font-bold mb-2" for="date">
    Date
  </label>
  <input
    v-model="date"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="date"
    type="date"
  />
</div>
<div class="flex items-center justify-between" v-if="!edit">
  <button
    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
  >
    Add Task
  </button>
</div>
<div class="flex items-center justify-between" v-else>
  <button
    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
  >
   Save
  </button>
</div>
</form>
</template>

<script>
import {ref,toRefs } from "vue";
import { useStore } from "vuex";
export default {
  props:['edit','task','index'],
  emits: ['closeForm'],
  setup(props,{ emit }) {
    const { task, edit,index } = toRefs(props);
    const emitFunction= ()=> {
      emit('closeForm')
    }
    function getDefaultDate() {
      const today = new Date()
      const year = today.getFullYear()
      const month = (today.getMonth() + 1).toString().padStart(2, '0')
      const day = today.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    const store = useStore();
    const description = ref("");
    const color = ref("#e60f0f");
    const priority = ref("low");
    const textDescriptionError = ref("")
    const date = ref(getDefaultDate());

    if(edit.value){
      description.value = task.value.description
      color.value = task.value.color
      priority.value = task.value.priority
      date.value = task.value.date
    }
    const submitForm = () => {
      // Check for validation errors before submitting the form
      if (!description.value) {
        // Form is valid; submit it
        textDescriptionError.value = 'Field is required'
      }else {
        const taskObject = {
        description:description.value,
        color:color.value,
        priority:priority.value,
        date:date.value,
      }
      if(!edit.value){
        store.commit("addTask", taskObject)
        description.value = ''
      }else {
        taskObject.id = task.value.id
        store.commit("updateTask", {index:index.value,taskObject})
        edit.value = false
        emitFunction()
      }
      }
    }

      return {
      submitForm,
      textDescriptionError,
      description,
      color,
      priority,
      date,
    };
  },
};
</script>

<style scoped>
input {
  border: none;
  outline: none;
}
</style>

