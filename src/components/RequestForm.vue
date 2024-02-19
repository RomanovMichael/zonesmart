<template lang="pug">
.request-form-wrap.tile
    form.request-form(@submit.prevent="logIn")
        h1.request-form-title Вход
        .request-form-label.request-form-label--reg
            span Нет аккаунта?
            router-link.link(to="#") Зарегистрироваться
        .request-form-input.input
            label.input-label.caption(for="email") Email
            .input-wrap
                input.input-inner(
                    v-model="email",
                    type="text",
                    name="email",
                    placeholder="yourmail@mail.ru",
                    @change="resetErrorCode"
                )
        .request-form-input.input
            label.input-label.caption(for="password") Пароль
            .input-wrap
                input.input-inner(
                    v-model.trim="password",
                    type="password",
                    name="pasword",
                    placeholder="Ваш пароль",
                    @change="resetErrorCode"
                )
                button.input-showpass
                    span
                        root-icon(name="EyeIcon")
        .request-form-label.request-form-label--forgot
            router-link.link(to="#") Забыли пароль?
        span.input-error(v-if="$store.state.login_error_code") {{ error_message }}
        button.request-form-btn.btn.btn--green(:disabled="is_btn_disabled")
            | Войти
</template>

<script>
import RootIcon from "@/assets/icons/RootIcon"

export default {
    name: "RequestForm",
    components: { RootIcon },
    data() {
        return {
            email: "",
            password: "",
            errors: [],
        }
    },
    computed: {
        error_message() {
            const { login_error_code } = this.$store.state
            if (!login_error_code) return null
            switch (login_error_code) {
                case 401:
                    return "Неверный логин или пароль"
                default:
                    return "Произошла ошибка"
            }
        },
        is_btn_disabled() {
            const { email, password } = this
            let btn_disabled = email == "" || password == ""
            return btn_disabled
        },
    },
    methods: {
        resetErrorCode() {
            this.$store.commit("RESET_ERROR_CODE")
        },
        async logIn() {
            const { email, password } = this
            await this.$store.dispatch("getToken", { email, password }).then()
        },
    },
}
</script>

<style lang="scss">
.request-form {
    &-wrap {
        width: 26.875rem;
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
