<template>
 
  <nav>
    <div>
      <router-link to="/">
      <img src="../components/img/logo.png" alt="" class="logo">
    </router-link>
    </div>

    <input type="checkbox" id="check">
    <label for="check" class="bar-btn">
      <i class="fas fa-bars"></i>
    </label>

    <ul class="nav-menu">
      <li><router-link to="/"><a class="" href="">Task Manager</a></router-link></li>
      <li><router-link to="/account"><a href="">Account</a></router-link></li>
      <li class="log-out-welcome">
        <a href="">Welcome, user</a>
      </li>
      <li>
        <button @click="signOut" id="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
    hover:bg-gradient-to-br 
    focus:ring-4 
    focus:outline-none 
    focus:ring-cyan-300 
    dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg 
    dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Log out</button>
      </li>
    </ul>
    
  </nav>          
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';


//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{


    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {}
};


</script>
