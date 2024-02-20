<template lang="pug">
.login
    .login-head
        a.login-logo(href="#")
            root-icon(name="LogoIcon")
        .login-socials
            .socials
                .socials-label Поддержка
                .socials-links
                    a.socials-link.socials-link--tg(href="#")
                        root-icon(name="TgIcon")
                    a.socials-link.socials-link--whats(href="#")
                        root-icon(name="WhatsIcon")
    login-form
</template>

<script>
import LoginForm from "../components/LoginForm"
import RootIcon from "@/assets/icons/RootIcon"
export default {
    name: "LoginView",
    components: {
        LoginForm,
        RootIcon,
    },
}
</script>

<style lang="scss">
.login {
    min-height: 100vh;

    &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2.5rem;
        margin-bottom: 7.5rem;
    }
}

.socials {
    display: flex;
    align-items: center;

    &-links {
        gap: 0.625rem;
        display: flex;
        align-items: center;
    }

    .socials-link {
        transition: all 0.3s ease;
        &--tg {
            color: $dark-blue;
            &:hover {
                color: #2aabee;
            }
            &:active {
                color: #269ad6;
            }
        }

        &--whats {
            color: $dark-blue;
            &:hover {
                color: #25d366;
            }
            &:active {
                color: #21be5c;
            }
        }
    }

    &-label {
        margin-right: 0.625rem;
    }
}
</style>
