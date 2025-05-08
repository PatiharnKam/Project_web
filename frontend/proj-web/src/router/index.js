import {createRouter, createWebHistory} from "vue-router"
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import Cal from "../views/Cal.vue"
import Profile from "../views/Profile.vue"
import Home from "../views/Home.vue"
import Result from "../views/Result.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
        component: Profile,
        meta: {
            requiresAuth: true // ต้อง login ก่อนถึงจะเข้าหน้านี้ได้
        }
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

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const auth = getAuth();
  
    //ใช้ onAuthStateChanged เพื่อตรวจสอบสถานะการ login ของผู้ใช้
    // ถ้า login แล้วจะได้ user object ถ้าไม่ login จะได้ null
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); 
      if (requiresAuth && !user) {
        //ถ้าไม่ login จะไปหน้า Home
        next('/home');
      } else {
        next();
      }
    });
  });

export default router