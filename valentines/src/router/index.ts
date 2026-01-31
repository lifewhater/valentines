import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
<<<<<<< HEAD
=======
import INTRO from "../components/INTRO.vue";
>>>>>>> main
import YES from "../components/YES.vue";
import INTRO from "../components/INTRO.vue";

const routes = [
<<<<<<< HEAD
    {path: '/', component: INTRO},
    { path: '/home', component: Home },
=======
    { path: '/home', component: Home },
    { path: '/', component: INTRO},
>>>>>>> main
    { path: '/yes', component: YES},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router