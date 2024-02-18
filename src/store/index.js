import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user_tokens: JSON.parse(localStorage.getItem("user_tokens")) || null,
        pager: {
            count: null,
            limit: 10,
            current: 1,
        },
        products: [],
    },
    getters: {
        get_goods: (state) => state.products ?? [],
        get_selected_products(state) {
            return state.products.filter((item) => item.selected)
        },
        is_authorized: (state) => !!state.user_tokens.access,
        get_pager_count(state) {
            return Math.ceil(state.pager.count / state.pager.limit)
        },
    },
    mutations: {
        SET_USER_TOKENS(state, data) {
            state.user_tokens = data
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
        REFRESH_USER_INFO(state, data) {
            state.user_tokens.access = data.access
        },
        UPDATE_PRODUCTS(state, data) {
            state.products = data
        },
        UPDATE_PAGER(state, data) {
            state.pager.count = data
        },
        SET_CURRENT_PAGE(state, data) {
            state.pager.current = data
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
                console.log(response)
                commit("SET_USER_TOKENS", response.data)
                localStorage.setItem(
                    "user_tokens",
                    JSON.stringify({
                        access: state.user_tokens.access,
                        refresh: state.user_tokens.refresh,
                    })
                )
            } catch (err) {
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
                console.log(response)
                commit("REFRESH_USER_INFO", response.data)
                localStorage.setItem(
                    "user_tokens",
                    JSON.stringify({
                        access: state.user_tokens.access,
                        refresh: state.user.refresh,
                    })
                )
            } catch (err) {
                console.log(err)
            }
        },
        async getProducts({ commit, state }) {
            try {
                const params = new URLSearchParams()
                params.append("limit", state.pager.limit)
                params.append("offset", state.pager.current)

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
                commit("UPDATE_PAGER", response.data.count)
            } catch (err) {
                console.log(err)
                if (err.response.status === 401) {
                    await this.dispatch(
                        "refreshUserInfo",
                        state.user_tokens.refresh
                    )
                }
            }
        },
        deleteCheckedProducts(state, data) {
            console.log(`Удалены элементы: ${data}`)
        },
    },
    modules: {},
})
