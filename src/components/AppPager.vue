<template lang="pug">
.app-pager.flex.--just-center
    .app-pager-bullets.flex
        button.app-pager-bullet(
            :class="[`${is_prev_disabled}`]",
            @click="setPrevNextPage('prev')"
        )
            span
                root-icon(name="ArrowRightIcon")
        button.app-pager-bullet(
            v-for="num in $store.getters.get_pager_count",
            :key="num",
            @click.prevent="setCurrentPage(num)",
            :class="[`${num === current_page ? 'is-current' : ''}`]"
        )
            | {{ num }}
        button.app-pager-bullet(
            :class="[`${is_next_disabled}`]",
            @click="setPrevNextPage('next')"
        )
            span
                root-icon(name="ArrowLeftIcon")
</template>
<script>
import RootIcon from "@/assets/icons/RootIcon"
export default {
    name: "AppPager",
    components: { RootIcon },
    computed: {
        is_prev_disabled() {
            const disabled_class_name =
                this.current_page === 1 ? "is-disabled" : ""

            return disabled_class_name
        },
        is_next_disabled() {
            const disabled_class_name =
                this.current_page === this.pager_count ? "is-disabled" : ""

            return disabled_class_name
        },
        pager_count() {
            return this.$store.getters.get_pager_count
        },
        current_page() {
            return this.$store.state.pager.current
        },
    },
    methods: {
        async setCurrentPage(page_number) {
            this.$store.commit("SET_CURRENT_PAGE", page_number)

            await this.$store.dispatch("getProducts")
        },
        async setPrevNextPage(to) {
            const current_page = this.$store.state.pager.current
            const to_page = to === "prev" ? current_page - 1 : current_page + 1

            await this.setCurrentPage(to_page)
        },
    },
}
</script>

<style lang="scss">
.app-pager {
    padding: 2rem;
    &-bullets {
        width: fit-content;
    }

    &-bullet {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.375rem;
        background-color: transparent;
        vertical-align: middle;
        text-align: center;
        color: $black;
        transition: all 0.3s ease;

        &:hover {
            background-color: $button_gray;
            transition: all 0.3s ease;
        }

        &.is-current {
            background-color: #d0d4d7 !important;
        }
        &.is-disabled {
            opacity: 0;
            pointer-events: none;
        }
    }
}
</style>
