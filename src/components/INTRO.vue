<!-- INTRO.vue -->
<template>
    <div class="flex flex-col gap-8 items-center justify-center h-screen w-screen bg-[#11001C]">
        <div
  :key="currentIndex"
  ref="split_text"
  class="text-[#d3abff] text-4xl text-pretty px-2 text-center"
>
  {{ message[currentIndex] }}
</div>
        <button v-if="currentIndex < message.length -1" @click="nextLine" 
        class=" relative text-white text-2xl transition bg-[#3f0064]
        py-2 px-4 rounded-xl border border-purple-300/75 shadow-lg shadow-purple-500/50">
            Next
        </button>
        <button v-else @click="nextPage" class=" relative text-white text-2xl transition bg-[#3f0064]
        py-2 px-4 rounded-xl border border-purple-300/75 shadow-lg shadow-purple-500/50">
            Continue
        </button>
    </div>
    
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const message = [
  "Hi Alina 💜",
  "I made a little something for you",
  "I love you <3"
]

const currentIndex = ref(0)
const router = useRouter()
const split_text = ref<HTMLElement | null>(null)

let split: SplitText | null = null

function animateText() {
  split = new SplitText(split_text.value, { type: 'chars' })

  gsap.from(split.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.04,
    duration: 0.5,
    ease: 'power2.out'
  })
}

function nextPage() {
  router.push('/home')
}

async function nextLine() {
  if (currentIndex.value < message.length - 1) {
    split?.revert()
    currentIndex.value++
    await nextTick()         
    animateText()
  }
}

onMounted(animateText)
</script>

<style>
</style>