<!-- App.vue -->
<template>
<INTRO v-if="loading" @click = "splashClick" />

<div v-else>
  <router-view/>
</div>


</template>

<script setup lang="ts">
import { ref } from "vue"
import INTRO from "./components/INTRO.vue";


const loading = ref(false)

const splashClick = () =>{
  loading.value = false
}

</script>

<style scoped>
:global(body) {
  background-color: #000000;
}
</style>