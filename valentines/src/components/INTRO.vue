<!-- INTRO.vue -->
<template>
    <div class="h-screen w-screen bg-blue-950">
        <div v-for="lines in message" :key="lines">
            {{ lines }}
        </div>
    </div>
</template>

<script setup lang="ts">

const message = [
    "Lorem ipsum ",
    "Lorem ipsum dolor sit amet,",
    "consectetur adipiscing elit",
]

</script>

<style scoped>

</style>