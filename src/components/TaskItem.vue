<template>
    <div id="taskContainerSafe" class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   <h3  class="text-xl font-medium text-gray-900 dark:text-white" :class="{ taskComplete: task.is_complete }">{{ task.title }}</h3>
   <h3  class="mb-3 font-normal text-gray-700 dark:text-gray-400" :class="{ taskComplete: task.is_complete }">{{ task.description }}</h3>

  <div id="checkContainer" class="inline-flex rounded-md shadow-sm" role="group">

   <button @click="updateToggle" type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-yellow-500 bg-transparent border border-yellow-500 rounded-l-lg 
   hover:bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:text-white 
   focus:z-10 focus:ring-2 focus:ring-yellow-500 focus:bg-yellow-500 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-yellow-500 dark:focus:bg-yellow-500">
      <svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
      </svg>Edit</button>
   
      <button @click="toggleComplete" type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-green-500 bg-transparent border-t border-b border-green-500 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600  hover:text-white focus:z-10 focus:ring-2 focus:ring-green-500 focus:bg-green-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-green-700 dark:focus:bg-green-700">
      <svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
      </svg>Complete</button>
   
      <button @click="deleteTask" type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-transparent border border-red-600 rounded-r-md hover:bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-red-600 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-600 dark:focus:bg-red-600">
      <svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
      </svg>Delete</button>

  </div>

   <div id="editTaskContainer" v-if="inputUpdate">
     <input id="editTaskInput" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder=" Task Title " v-model="name"/>
     <input id="editTaskInput" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder=" Task Description " v-model="description" @keyup.enter="updateTask" />
     <button id="buttonUpdateTask" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" @click="updateTask">Update</button>
   </div>
 </div>
   </template>
   
   <script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();

const name = ref("");

const description = ref("");

const props = defineProps({
 task: Object,
});

const emit = defineEmits(["taskUpdated", "taskDeleted"]);

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
 await taskStore.deleteTask(props.task.id);
 emit('taskDeleted');
};

const inputUpdate = ref(false);

// Funcion que realiza un "toggle" con un boton @click. para cambiar la condicion de la variable de false a true.
const updateToggle = () => {
 inputUpdate.value = !inputUpdate.value;
};


// Actualiza los datos de la tarea a traves de una funcion que se comunica con la store task.js.
const updateTask = () => {
 taskStore.updateTask(props.task.id, name.value, description.value);
 name.value = "";
 description.value = "";
 updateToggle();
};


const toggleComplete = () => {
 props.task.is_complete = !props.task.is_complete;
 taskStore.completeTask(props.task.id, props.task.is_complete);
 emit('taskUpdated');
};

// Obtener las tareas al montar el componente para mostrarla.
onMounted(() => {
 emit('taskUpdated'); 
});
</script>

<style>

.taskComplete {
  text-decoration: line-through;
  color: rgb(4, 108 , 78);
}
</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
