import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import NO from "../components/NO.vue";
import YES from "../components/YES.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/no', component: NO},
    { path: '/yes', component: YES},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router