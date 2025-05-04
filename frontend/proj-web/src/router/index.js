import {createRouter, createWebHistory} from "vue-router"
import Users from "../views/Users.vue"
import AddUser from "../views/AddUser.vue"
import UpdateUser from "../views/UpdateUser.vue"
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import Cal from "../views/Cal.vue"
import { getAuth } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
    {
        path: "/users",
        name: "Users",
        component: Users,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/adduser",
        name: "AddUser",
        component: AddUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/signin",
        name: "SignIn",
        component: SignIn
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
        path: "/updateuser/:userId",
        name: "UpdateUser",
        component: UpdateUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/signin'
    },
    {
        path: '/',
        redirect: '/signin'
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