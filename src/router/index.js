import Vue from "vue"
import VueRouter from "vue-router"
import LoginView from "../views/LoginView"
import ProductsView from "../views/ProductsView"

Vue.use(VueRouter)

const routes = [
    {
        path: "/login",
        component: LoginView,
    },
    {
        path: "/products",
        component: ProductsView,
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
