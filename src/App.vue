<template lang="pug">
#app
    router-view
</template>

<script>
export default {
    name: "App",
    methods: {
        checkUser() {
            const tokens = JSON.parse(localStorage.getItem("user_tokens"))
            if (tokens) {
                this.$store.commit("SET_USER_INFO", tokens)
            }
        },
    },
    created() {
        this.checkUser()
    },
}
</script>
