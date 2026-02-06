<!-- INTRO.vue -->
<template>
  <div class="flex flex-col gap-8 items-center justify-center h-screen w-screen bg-[#11001C]">

    <div :key="currentIndex" ref="split_text" class="h-60 w-screen text-[#d3abff] text-[50px] text-pretty px-5 text-center">
      {{ message[currentIndex] }}
    </div>

    <button v-if="currentIndex < message.length - 1" @click="nextLine" class=" text-white text-2xl transition bg-[#3f0064]
        py-2 px-4 rounded-xl border border-purple-300/75 hover:shadow-lg hover:shadow-purple-500/50
        duration-200 ease-in-out hover:-translate-y-1 hover:scale-110">
      Next
    </button>

    <button v-else @click="nextPage" class=" relative text-white text-2xl transition bg-[#3f0064]
        py-2 px-4 rounded-xl border border-purple-300/75 hover:shadow-lg hover:shadow-purple-500/50
        duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 ">
      Continue
    </button>
  </div>

</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const message = [
  "Hi Alina 💜",
  "I made a little something for you",
  "Thank you for supporting me",
  "Through my ups and downs",
  "Through the thick and thin",
  "Thank you for being my favorite person",
  "My safe space",
  "The reason I smile at my phone like a fool",
  "I love you <3"
]

const currentIndex = ref(0)
const router = useRouter()
const split_text = ref<HTMLElement | null>(null)

function nextPage() {
  router.push('/home')
}

function animation() {
let split = SplitText.create(split_text.value, { type: 'words, lines'})

  gsap.from(split.lines, {
    duration: 1,
    opacity: 0,
    stagger: 0.3,
    y: 20,
    ease: "expo.out",
    onComplete: () => split?.revert()
  })
}

async function nextLine() {
  if (currentIndex.value < message.length - 1) {
    currentIndex.value++
    await nextTick()
    animation()
  }
}

onMounted(() => {

})

</script>

<style></style>