import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            access: null,
            refresh: null,
        },
        products: [
            {
                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                brand_id: "5055881",
                brand_name: "Sunshine",
                category_id: "17028631",
                category_name: null,
                created: "2024-01-11T17:00:22.686377+03:00",
                discount: 13,
                id: "fc386f20-d58b-472b-8c14-b1389e7e9c5c",
                images: [
                    "https://cdn1.ozone.ru/s3/multimedia-a/6250097194.jpg",
                    "https://cdn1.ozone.ru/s3/multimedia-5/6250097081.jpg",
                    "https://cdn1.ozone.ru/s3/multimedia-l/6250097169.jpg",
                    "https://cdn1.ozone.ru/s3/multimedia-f/6250097019.jpg",
                    "https://cdn1.ozone.ru/s3/multimedia-e/6250097162.jpg",
                ],
                is_removed: false,
                max_price: null,
                min_price: null,
                on_sale: false,
                price: 1500,
                quantity: 0,
                remote_id: "0",
                sku: "53478",
                strategy: null,
                title: "Бейсболка Baseball Cap Karate черно-белая (размер OSFM)",
                undiscounted_price: 1700,
                url: "",
            },
            {
                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                brand_id: "5055881",
                brand_name: "Mockbrand",
                category_id: "17028631",
                category_name: null,
                created: "2024-01-11T17:00:22.686377+03:00",
                discount: 13,
                id: "fc386f20",
                images: [
                    "https://cdn1.ozone.ru/s3/multimedia-5/6250097081.jpg",
                    "https://cdn1.ozone.ru/s3/multimedia-l/6250097169.jpg",
                    "https://cdn1.ozone.ru/s3/multimedia-f/6250097019.jpg",
                    "https://cdn1.ozone.ru/s3/multimedia-e/6250097162.jpg",
                ],
                is_removed: false,
                max_price: 2000,
                min_price: 2,
                on_sale: false,
                price: 1890,
                quantity: 4,
                remote_id: "98",
                sku: "23492",
                strategy: null,
                title: "Товар номер 2",
                undiscounted_price: 1700,
                url: "",
            },
            {
                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                brand_id: "5055881",
                brand_name: "Mockbrand1",
                category_id: "17028631",
                category_name: null,
                created: "2024-01-11T17:00:22.686377+03:00",
                discount: 13,
                id: "d3423432",
                images: [
                    "https://cdn1.ozone.ru/s3/multimedia-l/6250097169.jpg",
                    "https://cdn1.ozone.ru/s3/multimedia-f/6250097019.jpg",
                    "https://cdn1.ozone.ru/s3/multimedia-e/6250097162.jpg",
                ],
                is_removed: false,
                max_price: 1000,
                min_price: 24,
                on_sale: false,
                price: 1000,
                quantity: 4,
                remote_id: "98",
                sku: "23492",
                strategy: null,
                title: "Товар номер 3",
                undiscounted_price: 1700,
                url: "",
            },
        ],
    },
    getters: {
        is_authorized: (state) => !!state.user.access,
        get_goods: (state) => state.products ?? [],
    },
    mutations: {
        SET_USER_INFO(state, data) {
            state.user.access = data.access
            state.user.refresh = data.refresh
        },
        UPDATE_PRODUCTS(state, data) {
            state.products = data
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
                commit("SET_USER_INFO", response.data)
                localStorage.setItem(
                    "user_tokens",
                    JSON.stringify({
                        access: state.user.access,
                        refresh: state.user.refresh,
                    })
                )
            } catch (err) {
                console.log(err)
            }
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
                .then((response) =>
                    commit("UPDATE_PRODUCTS", response.data.results)
                )
                .catch((err) => console.log(err))
        },
        deleteCheckedProducts(state, data) {
            console.log(`Удалены элементы: ${data}`)
        },
    },
    modules: {},
})
