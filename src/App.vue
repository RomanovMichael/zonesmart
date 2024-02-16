<template lang="pug">
#app
    RootIcon(name="WhatsIcon")
</template>

<script>
import RootIcon from "./assets/icons/RootIcon"

export default {
    name: "App",
    components: { RootIcon },
}
</script>

<style lang="scss">
p {
    font-size: 1rem;
}
</style>
