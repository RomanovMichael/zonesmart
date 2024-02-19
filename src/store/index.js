import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"
import router from "@/router"

Vue.use(Vuex)
const getProductsParams = (state) => {
    const params = new URLSearchParams()

    params.append("limit", state.pager.limit)

    if (state.pager.current !== 1) {
        params.append("offset", (state.pager.current - 1) * state.pager.limit)
    } else {
        params.append("offset", state.pager.current)
    }

    return params
}
export default new Vuex.Store({
    state: {
        user_tokens: JSON.parse(localStorage.getItem("user_tokens")) || null,
        user_mail: JSON.parse(localStorage.getItem("user_mail")) || null,
        pager: {
            count: 0,
            limit: 10,
            current: 1,
            rest_count: 0,
        },
        products: [],
        login_error_code: null,
    },
    getters: {
        get_goods: (state) => state.products ?? [],
        is_authorized(state) {
            return state.user_tokens?.access ? true : false
        },
        get_selected_products(state) {
            return state.products.filter((item) => item.selected)
        },
        get_pager_count(state) {
            return Math.ceil(state.pager.count / state.pager.limit)
        },
    },
    mutations: {
        SET_USER_TOKENS(state, data) {
            state.user_tokens = data
        },
        SET_USER_MAIL(state, address) {
            state.user_mail = address
        },
        // Установка выделения одного элемента
        UPDATE_IS_SELECTED(state, id) {
            state.products.forEach((item) => {
                if (item.id === id) {
                    item.selected = !item.selected
                }
            })
        },
        // Установка выделения для всех элементов
        UPDATE_ALL_IS_SELECTED(state, flag) {
            state.products.forEach((item) => (item.selected = flag))
        },
        // Изменение значения цены
        SET_PRICE_FOR_SELECTED(state, { price_type, value }) {
            state.products.forEach((item) => {
                if (item.selected) {
                    item[price_type] = value
                }
            })
        },
        REFRESH_USER_INFO(state, data) {
            state.user_tokens.access = data.access
        },
        UPDATE_PRODUCTS(state, data) {
            state.products = data
        },
        SET_COUNT_REST(state, count) {
            state.pager.rest_count = count
        },
        UPDATE_PAGER(state, data) {
            state.pager.count = data.count
            state.pager.prev = data.previous
            state.pager.next = data.next
        },
        SET_CURRENT_PAGE(state, data) {
            state.pager.current = data
        },
        SET_LOGIN_ERROR_CODE(state, error_code) {
            state.login_error_code = error_code
        },
        RESET_ERROR_CODE(state) {
            state.login_error_code = null
        },
    },
    actions: {
        async getToken({ commit, state }, user_info) {
            try {
                const response = await axios.post(
                    "https://dev-ar.zonesmart.com/api/user/jwt/create/",
                    {
                        ...user_info,
                    }
                )

                commit("SET_USER_TOKENS", response.data)
                commit("SET_USER_MAIL", user_info.email)

                localStorage.setItem(
                    "user_tokens",
                    JSON.stringify({
                        access: state.user_tokens.access,
                        refresh: state.user_tokens.refresh,
                    })
                )
                localStorage.setItem(
                    "user_mail",
                    JSON.stringify(state.user_mail)
                )

                router.push("/")
            } catch (err) {
                commit("SET_LOGIN_ERROR_CODE", err.response.status)
                console.log(err)
            }
        },
        async refreshUserInfo({ commit, state }, refresh_token) {
            try {
                const response = await axios.post(
                    "https://dev-ar.zonesmart.com/api/user/jwt/refresh/",
                    {
                        refresh: refresh_token,
                    }
                )
                commit("REFRESH_USER_INFO", response.data)

                localStorage.setItem(
                    "user_tokens",
                    JSON.stringify({
                        access: state.user_tokens.access,
                        refresh: state.user_tokens.refresh,
                    })
                )

                await this.dispatch("getProducts")
            } catch (err) {
                console.log(err)
            }
        },
        async getProducts({ commit, state }) {
            try {
                const params = getProductsParams(state)

                const response = await axios.get(
                    `https://dev-ar.zonesmart.com/api/product/?${params}`,
                    {
                        headers: {
                            Authorization: `JWT ${state.user_tokens.access}`,
                        },
                    }
                )

                const goods = response.data.results.map((item) => {
                    item.selected = false
                    return item
                })

                commit("UPDATE_PRODUCTS", goods)
                commit("SET_COUNT_REST", response.data.results.length)
                commit("UPDATE_PAGER", response.data)
            } catch (err) {
                if (err.response.status === 401) {
                    await this.dispatch(
                        "refreshUserInfo",
                        state.user_tokens.refresh
                    )
                }
            }
        },
        deleteSelectedProducts({ state }) {
            const deleted_products_ids = []

            state.products.forEach((item) => {
                if (item.selected) deleted_products_ids.push(item.id)
            })

            console.log(`Удалены элементы: ${deleted_products_ids}`)
        },
    },
    modules: {},
})
