<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <video src="/bg_video.mp4" autoplay loop muted playsinline
      class="fixed top-0 left-0 w-full h-full object-cover z-0" />
    <div class="relative z-10 flex-row mt-50 mx-5 space-y-10">

      <div ref="boxAnimation" class="flex bg-[#3A025B] rounded-xl h-20 
      justify-center items-center shadow-lg shadow-purple-400/50 opacity-0
       border border-purple-500">
        <a class="text-white text-3xl uppercase text-center">
          Will you be my valentines?
        </a>
      </div>

      <div class="flex justify-between text-white text-4xl gap-5">
        <router-link to="/yes" class=" flex justify-center 
      bg-gray-600 hover:bg-purple-400 border border-gray-500 
      py-2 px-5 rounded-xl w-full yesButton transition-transform duration-300"
          :style="{ transform: `scale(${yesGrows})` }">
          YES
        </router-link>

        <div @click="onClick" class=" flex justify-center noButton
       bg-gray-600 hover:bg-purple-400 border border-gray-500 
        py-2 px-5 rounded-xl w-full">
          <button class="">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap';

const boxAnimation = ref<HTMLElement | null>(null)

const yesGrows = ref(1)
function onClick() {
  yesGrows.value += 0.2
}


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