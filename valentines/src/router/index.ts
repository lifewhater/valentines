import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import YES from "../components/YES.vue";
import INTRO from "../components/INTRO.vue";

const routes = [
    {path: '/', component: INTRO},
    { path: '/home', component: Home },
    { path: '/yes', component: YES},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router