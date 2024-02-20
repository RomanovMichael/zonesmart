<template>
    <main class="main">
        <AppNav />
        <AppProducts />
    </main>
</template>

<script>
import AppProducts from "../components/AppProducts"
import AppNav from "../components/AppNav"

export default {
    name: "AppView",
    components: {
        AppProducts,
        AppNav,
    },
}
</script>

<style lang="scss">
.main {
    padding: 6.875rem 0;
}
</style>
