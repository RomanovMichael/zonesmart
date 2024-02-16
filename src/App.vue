<template>
    <div id="app">
        <form class="form">
            <h1 class="form-title">Вход</h1>
            <div class="form-label">
                <span>Нет аккаунта?</span>
                <router-link class="link" to="#"
                    >Зарегистрироваться</router-link
                >
            </div>
            <div class="form-input">
                <input
                    v-model="user_info.email"
                    type="text"
                    name="email"
                    placeholder="yourmail@mail.ru"
                />
            </div>
            <div class="form-input">
                <input
                    v-model="user_info.password"
                    type="text"
                    name="pasword"
                    placeholder="Ваш пароль"
                />
            </div>
            <div class="form-label">
                <router-link class="link" to="#">Забыли пароль?</router-link>
            </div>
            <button
                :disabled="is_btn_disabled"
                class="form-btn"
                @click.prevent="logIn"
            >
                Войти
            </button>
            <button class="form-btn" @click.prevent="getProducts">
                продукты
            </button>
            <div class="">{{ user_info.email }} {{ user_info.password }}</div>
        </form>

        <section class="products">
            <div v-for="item in get_goods" :key="item.id" class="products-item">
                <input type="checkbox" />
                <div>images: {{ item.images }}</div>
                <img
                    style="width: 100px; height: 100px"
                    :src="item.images[0]"
                    alt=""
                />
                <div>remote_id: {{ item.remote_id }}</div>
                <div>brand_name: {{ item.brand_name }}</div>
                <div>title: {{ item.title }}</div>
                <div>quantity: {{ item.quantity }}</div>
                <div>price: {{ item.price }}</div>
                <div>min_price: {{ item.min_price }}</div>
                <div>max_price: {{ item.max_price ?? "нет" }}</div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            user_info: {
                email: "",
                password: "",
            },
            res: {
                accessToken: null,
                refreshToken: null,
            },
            products: null,
        }
    },
    computed: {
        is_btn_disabled() {
            let btn_disabled =
                this.user_info.email == "" || this.user_info.password == ""
            return btn_disabled
        },
        get_goods() {
            return this.$store.getters["get_goods"]
        },
    },
    methods: {
        async logIn() {
            await this.$store.dispatch("getToken", this.user_info)
        },
        async getProducts() {
            await this.$store.dispatch("getProducts")
        },
    },
}
</script>

<style lang="scss">
.form {
    padding: 2.5rem 2.5rem 3.75rem;
    width: 26.875rem;
    background-color: $white;
    border-radius: 1rem;
    &-btn {
        margin-top: 2.5rem;
    }
}
</style>
