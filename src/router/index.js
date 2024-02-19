import Vue from "vue"
import VueRouter from "vue-router"
import LoginView from "../views/LoginView"
import AppView from "../views/AppView"
import store from "@/store"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "App",
        component: AppView,
        meta: {
            auth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
        meta: {
            auth: false,
        },
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuth = store.getters.is_authorized
    const requireAuth = to.matched.some((record) => record.meta.auth)

    if (requireAuth && !isAuth) {
        next("/login")
    } else if (!requireAuth && isAuth) {
        next("/")
    }
    next()
})
export default router
