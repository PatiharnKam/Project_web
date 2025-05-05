import {createRouter, createWebHistory} from "vue-router"
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import Cal from "../views/Cal.vue"
import Profile from "../views/Profile.vue"
import Home from "../views/Home.vue"
import Result from "../views/Result.vue"
import { getAuth } from "firebase/auth";
import Result from "../views/Result.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
    {
        path: "/signin",
        name: "SignIn",
        component: SignIn
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp
    },
    {
        path: "/cal",
        name: "Cal",
        component: Cal
    },
    {
        path: "/profile/:userId",
        name: "Profile",
        component: Profile
    },
    {
        path: "/result",
        name: "Result",
        component: Result,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/home'
    },
    {
        path: '/',
        redirect: '/home'
    }
    ]
})

router.beforeEach((to, from, next)=>{
    if (to.path === '/signin') {
        next()
        return
    }
    const currentUser = getAuth().currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if(requiresAuth && !currentUser){
        next('/signin')
    } else {
        next()
    }
})

export default router