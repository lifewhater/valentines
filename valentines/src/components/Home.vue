
<template>
  <div class="flex-row mt-50 mx-5 space-y-10">
    <div class="flex bg-purple-800 rounded-xl h-20 justify-center items-center shadow-lg shadow-purple-400/50">
      <a class="text-white text-xl">Placeholder</a>
    </div>
    <div class=" flex justify-between text-white text-4xl gap-5">

     <router-link to="/yes" class=" bg-gray-600 hover:bg-purple-400 border border-gray-500 py-2 px-5 rounded-xl w-full">
        Yes
     </router-link>

     <router-link to="/no" class="bg-gray-600 hover:bg-purple-400 border border-gray-500  py-2 px-5 rounded-xl w-full ">
        No
    </router-link>
  </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>

</style>