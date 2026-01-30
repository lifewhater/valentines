<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <video
      src="/bg_video.mp4"
      autoplay
      loop
      muted
      playsinline
      class="fixed top-0 left-0 w-full h-full object-cover z-0" />
    <div class="relative z-10 flex-row mt-50 mx-5 space-y-10">

    <div class="flex bg-[#3A025B] rounded-xl h-20 
      justify-center items-center shadow-lg shadow-purple-400/50
       border border-purple-500">
      <a class="text-white text-xl">
        Placeholder
      </a>
    </div>

     <div class=" flex justify-between text-white text-4xl gap-5">
      <router-link to="/yes" class=" flex justify-center 
      bg-gray-600 hover:bg-purple-400 border border-gray-500 
      py-2 px-5 rounded-xl w-full yesButton transition-transform duration-300"
      :style="{ transform: `scale(${yesGrows})`}">
          YES
      </router-link>

      <div class=" flex justify-center
       bg-gray-600 hover:bg-purple-400 border border-gray-500 
        py-2 px-5 rounded-xl w-full ">
        <button @click="onClick" class="noButton">No</button>
    </div>
    </div>
     </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue'
const yesGrows = ref(1)
function onClick() {
  yesGrows.value += 0.2
}

</script>

<style scoped>

</style>