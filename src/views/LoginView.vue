<template lang="pug">
.login
    .login-head.flex.--just-space.--align-center
        a.login-logo(href="#")
            root-icon(name="LogoIcon")
        .login-socials
            .socials.flex.--align-center
                .socials-label Поддержка
                .socials-links.flex.--align-center
                    a.socials-link.socials-link--tg(href="#")
                        root-icon(name="TgIcon")
                    a.socials-link.socials-link--whats(href="#")
                        root-icon(name="WhatsIcon")
    request-form
</template>

<script>
import RequestForm from "../components/RequestForm"
import RootIcon from "@/assets/icons/RootIcon"
export default {
    name: "LoginView",
    components: {
        RequestForm,
        RootIcon,
    },
}
</script>

<style lang="scss">
.login {
    min-height: 100vh;

    &-head {
        padding: 2.5rem;
        margin-bottom: 7.5rem;
    }
}

.socials {
    &-links {
        gap: 0.625rem;
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
