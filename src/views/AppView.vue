<template lang="pug">
main.main
    app-nav
    app-products
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

@media screen and (max-width: 1600px) {
    .main {
        padding: 6.785rem 2rem;
    }
}
</style>
