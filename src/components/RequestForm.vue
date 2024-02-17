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
                    autocomplete="on"
                )
            span.input-error
                | Длиннющий текст ошибки, когда не помещается в одну строку
        .request-form-input.input
            label.input-label.caption(for="password") Пароль
            .input-wrap
                input.input-inner(
                    v-model.trim="password",
                    type="password",
                    name="pasword",
                    placeholder="Ваш пароль",
                    autocomplete="on"
                )
                button.input-showpass
                    span
                        root-icon(name="EyeIcon")
            span.input-error Текст ошибки
        .request-form-label.request-form-label--forgot
            router-link.link(to="#") Забыли пароль?
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
        is_btn_disabled() {
            const { email, password } = this
            let btn_disabled = email == "" || password == ""
            return btn_disabled
        },
    },
    methods: {
        async logIn() {
            const { email, password } = this
            await this.$store.dispatch("getToken", { email, password })
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
