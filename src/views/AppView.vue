<template>
    <div class="app-wrap">
        <AppNav />
        <TheProducts />
    </div>
</template>

<script>
import TheProducts from "../components/TheProducts"
import AppNav from "../components/AppNav"
export default {
    name: "AppView",
    components: {
        TheProducts,
        AppNav,
    },
}
</script>

<style lang="scss">
.app-wrap {
    padding-top: 6.875rem;
}
</style>
