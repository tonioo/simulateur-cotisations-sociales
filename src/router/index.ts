import { createRouter, createWebHistory } from 'vue-router'
import CotisationView from '../views/CotisationView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: CotisationView
        }
    ]
})

export default router
