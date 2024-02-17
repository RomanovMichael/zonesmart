<template>
    <div class="request-form-wrap tile">
        <form class="request-form">
            <h1 class="request-form-title">Вход</h1>
            <div class="request-form-label request-form-label--reg">
                <span>Нет аккаунта?</span>
                <router-link class="link" to="#"
                    >Зарегистрироваться</router-link
                >
            </div>
            <div class="request-form-input input">
                <div class="input-label caption">Email</div>
                <div class="input-wrap">
                    <input
                        v-model="user_info.email"
                        class="input-inner"
                        type="email"
                        name="email"
                        placeholder="yourmail@mail.ru"
                    />
                </div>
                <div class="input-error">
                    Длиннющий текст ошибки, когда не помещается в одну строку
                </div>
            </div>
            <div class="request-form-input input">
                <div class="input-label caption">Пароль</div>
                <div class="input-wrap">
                    <input
                        v-model="user_info.password"
                        class="input-inner"
                        type="password"
                        name="pasword"
                        placeholder="Ваш пароль"
                    />
                    <button class="input-showpass">
                        <span><RootIcon name="EyeIcon" /></span>
                    </button>
                </div>
                <div class="input-error">текст ошибки</div>
            </div>
            <div class="request-form-label request-form-label--forgot">
                <router-link class="link" to="#">Забыли пароль?</router-link>
            </div>
            <button
                :disabled="is_btn_disabled"
                class="request-form-btn btn btn--green"
                @click.prevent="logIn"
            >
                Войти
            </button>
        </form>
    </div>
</template>

<script>
import RootIcon from "@/assets/icons/RootIcon"

export default {
    name: "RequestForm",
    components: { RootIcon },
    data() {
        return {
            user_info: {
                email: "",
                password: "",
            },
        }
    },
    computed: {
        is_btn_disabled() {
            let btn_disabled =
                this.user_info.email == "" || this.user_info.password == ""
            return btn_disabled
        },
    },
    methods: {
        async logIn() {
            await this.$store.dispatch("getToken", this.user_info)
        },
    },
}
</script>

<style lang="scss">
.request-form {
    &-wrap {
        width: 26.875rem;
        padding: 2.5rem 2.5rem 3.75rem;
    }

    &-input {
        margin-top: 1.25rem;
        & .input-wrap {
            margin-top: 0.5rem;
        }
    }

    &-label {
        &--reg {
            margin-top: 1.25rem;
            & span {
                margin-right: 0.25rem;
            }
        }

        &--forgot {
            margin-top: 0.625rem;
        }
    }

    &-btn {
        margin-top: 2.5rem;
    }
}
</style>
