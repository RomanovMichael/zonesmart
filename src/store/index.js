import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            access_token: null,
            refresh_token: null,
        },
        products: null,
    },
    getters: {},
    mutations: {
        SET_TOKENS(state, data) {
            state.user.access_token = data.access
            state.user.refresh_token = data.refresh
        },
        UPDATE_PRODUCTS(state, data) {
            state.products = data
        },
    },
    actions: {
        async getToken({ commit }, user_info) {
            axios
                .post("https://dev-ar.zonesmart.com/api/user/jwt/create/", {
                    ...user_info,
                })
                .then((response) => {
                    commit("SET_TOKENS", response.data)
                })
                .catch((err) => console.log(err))
        },
        async getProducts({ commit, state }) {
            const params = new URLSearchParams()
            params.append("limit", 10)
            params.append("offset", 4)

            axios
                .get(`https://dev-ar.zonesmart.com/api/product/?${params}`, {
                    headers: {
                        Authorization: `JWT ${state.user.access_token}`,
                    },
                })
                .then((response) => console.log(response))
                .then((response) => commit("UPDATE_PRODUCTS", response))
                .catch((err) => console.log(err))
        },
    },
    modules: {},
})
