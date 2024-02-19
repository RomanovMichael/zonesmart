<template>
    <nav class="app-nav flex --align-center --just-end">
        <button class="app-nav-control">
            <RootIcon name="BellIcon" />
        </button>
        <button
            v-if="$store.state.user_mail"
            class="app-nav-control flex --align-center"
        >
            {{ $store.state.user_mail }}
            <RootIcon name="ArrowIcon" />
        </button>
    </nav>
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
    top: 0;
    left: 0;
    right: 0;
    background-color: $white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 1.75rem 1.875rem;
    gap: 1.875rem;
    z-index: 1;
}
</style>
