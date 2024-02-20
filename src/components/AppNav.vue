<template lang="pug">
nav.app-nav
    button.app-nav-control.app-nav-control--notif
        root-icon(name="BellIcon")
    button.app-nav-control.app-nav-control--user(v-if="$store.state.user_mail")
        | {{ $store.state.user_mail }}
        root-icon(name="ArrowIcon")
</template>

<script>
import RootIcon from "@/assets/icons/RootIcon"
export default {
    name: "AppNav",
    components: {
        RootIcon,
    },
}
</script>

<style lang="scss">
.app-nav {
    position: fixed;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    background-color: $white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 1.75rem 1.875rem;
    gap: 1.875rem;
    z-index: 1;

    &-control {
        display: flex;
        align-items: center;

        &.app-nav-control--notif {
            color: $gray;
            transition: color 0.3s ease;
            &:hover {
                color: $black;
                transition: color 0.3s ease;
            }
        }

        &.app-nav-control--user {
            color: $black;
            transition: color 0.3s ease;
            &:hover {
                color: $green;
                transition: color 0.3s ease;
            }
        }
    }
}
</style>
