import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user_tokens: JSON.parse(localStorage.getItem("user_tokens")) || null,

        // user: {
        //     access: null,
        //     refresh: null,
        // },
        pager: {
            count: null,
            limit: 10,
            current: 1,
        },
        products: [],
    },
    getters: {
        get_goods: (state) => state.products ?? [],
        is_authorized: (state) => !!state.user_tokens.access,
        get_pager_count(state) {
            return Math.ceil(state.pager.count / state.pager.limit)
        },
    },
    mutations: {
        SET_USER_TOKENS(state, data) {
            state.user_tokens = data
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
                commit("UPDATE_PAGER", response.data.count)
                commit("UPDATE_PRODUCTS", response.data.results)
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
