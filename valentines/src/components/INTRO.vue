<!-- INTRO.vue -->
<template>
    <div class="flex flex-col gap-8 items-center justify-center h-screen w-screen bg-[#11001C]">
        <div class="text-[#d3abff] text-4xl text-pretty px-2 text-center">
            {{ message[currentIndex] }}
        </div>
        <button v-if="currentIndex < message.length -1" @click="nextLine" 
        class=" relative text-white text-2xl transition bg-[#3f0064]
        py-2 px-4 rounded-xl border border-purple-300/75 shadow-lg shadow-purple-500/50">
            Next
        </button>
        <button v-else @click="nextPage" class="text-white transition">
            Continue
        </button>
    </div>
    
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const message = [
    "Hi Alina 💜",
    "I made a little something for you",
    "Took me a long time to make this.",
    "I love you <3"
]

const currentIndex = ref(0)
const router = useRouter()

function nextPage(){
    router.push('/home')
}

function nextLine() {
if(currentIndex.value < message.length - 1){
        currentIndex.value++
    }

}

</script>

<style scoped>

</style>