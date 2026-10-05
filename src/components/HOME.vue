<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <video src="/bg_video.mp4" autoplay loop muted playsinline
      class="fixed top-0 left-0 w-full h-full object-cover z-0" />
    <div class="relative z-10 flex flex-col mt-50 mx-5 space-y-10 justify-center">

      <div ref="boxAnimation" class="flex bg-[#3A025B] rounded-xl h-auto w-full
      justify-center items-center shadow-lg shadow-purple-400/50 opacity-0
       border border-purple-500 
       hover:shadow-purple-400">
        <a class="text-white text-3xl uppercase text-center py-5">
          HAPPY TWO YEARS ANNIVERSARY MY BABYLICIOUS <3
        </a>
    </div>
    <div class="flex justify-center-safe">
        <router-link to="/yes" class="buttonPress flex justify-center text-white text-2xl text-center
        bg-gray-600 hover:bg-purple-400 border border-gray-500
        py-2 px-5 rounded-xl w-50">
          NEW UPDATE
        </router-link>
      </div>
      </div>      
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap';

const boxAnimation = ref<HTMLElement | null>(null)
onMounted(() => {
gsap.from(boxAnimation.value, {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power2.out" 
  })

gsap.to(boxAnimation.value, { autoAlpha: 1, y: 0, duration:1})

})

</script>

<style scoped></style>