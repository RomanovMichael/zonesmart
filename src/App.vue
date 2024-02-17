<template>
    <div id="app">
        <router-view></router-view>
    </div>
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
    mounted() {
        this.checkUser()
    },
}
</script>
