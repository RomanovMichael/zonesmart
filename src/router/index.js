import Vue from "vue"
import VueRouter from "vue-router"
import LoginView from "../views/LoginView"
import ProductsView from "../views/ProductsView"
import store from "@/store"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Products",
        component: ProductsView,
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
