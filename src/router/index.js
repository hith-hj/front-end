import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Favorits from '@/views/Favorits.vue'
import Recipes from '@/views/Recipes.vue'
import Recipe from '@/views/Recipe.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('@/views/About.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () =>
            import ('@/views/Signup.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/Login.vue')
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/favorits',
        name: 'Favorits',
        component: Favorits,
    },
    {
        path: '/recipes/:fields',
        name: 'Recipes',
        component: Recipes,
    },
    {
        path: '/recipe/:id',
        name: 'Recipe',
        component: Recipe,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router