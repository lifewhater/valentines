import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import INTRO from "../components/INTRO.vue";
import YES from "../components/YES.vue";

const routes = [
    { path: '/home', component: Home },
    { path: '/', component: INTRO},
    { path: '/yes', component: YES},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router