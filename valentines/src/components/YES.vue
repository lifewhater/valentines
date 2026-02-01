<template>
    <div class="flex items-center justify-center h-screen p-5 bg-[#11001c]">
        <img :src="selectedGif" alt="Random GIF" 
        class=" border border-purple-500 rounded-2xl shadow-2xl shadow-purple-600/50">
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import yes1 from '/YES/yes1.gif'
import yes2 from '/YES/yes2.gif'
import yes3 from '/YES/yes3.gif'
import yes4 from '/YES/yes4.gif'
import yes5 from '/YES/yes5.gif'
import yes6 from '/YES/yes6.gif'
import yes7 from '/YES/yes7.gif'
import yes8 from '/YES/yes8.gif'

const yes_gifs = [
    yes1, yes2, yes3, yes4, yes5, yes6, yes7, yes8
]

const selectedGif = ref('')

function randomGif() {
    const idx = Math.floor(Math.random() * yes_gifs.length)
    selectedGif.value = yes_gifs[idx]!
}

onMounted(randomGif)

</script>

<style scoped></style>