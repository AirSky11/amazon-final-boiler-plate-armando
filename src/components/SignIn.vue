<!-- COMPONENTE BOILERPLATE -->
 
<template>

<div class="sign">
  <div id="container" class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

    <div class="logo">
      <img src="" alt="">
    </div>

    <h3 id="header-title" class="text-xl font-medium text-gray-900 dark:text-white">Log In to ToDo App</h3>
    
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label id="input-field-label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
          <input
            type="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <label id="input-field-label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
        </div>
        
        <div class="buttons">
        <button id="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="submit">Sign In</button>
        <p>Don't have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p>
        </div>
      </div>
    </form>

    
  </div>
</div>
</template>
<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue"
// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

//var para hacer login

const email = ref ("")
const password = ref ("")

// Router to push user once Signedin to home
const redirect = useRouter();


// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    // redirige al usuario a la página de inicio (homeView)
    redirect.push({ path: "/" });
  } catch (error) {
    alert("Error: " + error.message);
  }
};
</script>

<style scoped>

.sign {
    height: 100vh;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

</style>
