import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import YES from "../components/YES.vue";
import INTRO from "../components/INTRO.vue";
import GALLERY from "../components/GALLERY.vue";

const routes = [
    { path: '/home', component: Home },
    { path: '/', component: INTRO },
    { path: '/yes', component: YES },
    { path: '/gallery', component: GALLERY }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router