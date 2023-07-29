<template >
  
<div class="newTaskContainer">
  <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add a new Task</h1>
  <div v-if="showErrorMessage">
    <p class="error-text">{{ errorMessage }}</p>
  </div>
  <div class="inputContainer">
    <div class="input-field">
      <input 
      type="text" 
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      placeholder="Add a Task Title" 
      v-model="name" />
    </div>
          <!-- class="file:border file:border-solid"  -->

    <div class="input-field">
      <input
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="Add a Task Description "
        v-model="description"
        @keyup.enter="addTask"
      />
    </div>
    <div class="addTaskBotton">
    <button @click="addTask" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
    hover:bg-gradient-to-br 
    focus:ring-4 
    focus:outline-none 
    focus:ring-cyan-300 
    dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg 
    dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Task</button>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

const addTask = () => {
  if (name.value.length === 0 || description.value.length === 0) {
    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
  }
};
</script>

<style></style>
