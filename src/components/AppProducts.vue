<template lang="pug">
section.app-products.tile
    .app-products-head
        h2.app-products-title Мои товары
        button.app-products-questions-btn(type="button")
            root-icon(name="QuestionIcon")
        .app-products-counter
            | {{ $store.state.pager.rest_count }} из
            | {{ $store.state.pager.count }}
    .app-products-filters.filters
        .filters-text
            p.filters-text-item
                | Добавьте товары вашего магазина из одной товарной и ценовой
                | категории (разница цены не больше 15%)
            br
            br
            p.filters-text-item
                | Для добавления нескольких товаров введите несколько
                | артикулов через запятую или используя клавишу Enter
        .filters-control
            .input
                label.input-label.caption Добавление товаров
                .input-wrap
                    input.input-inner(
                        type="text",
                        placeholder="Введите артикул продавца, артикул WB или ссылку на товар"
                    )
                    button.btn(disabled="") Добавить
                label.input-label.caption
                    | Например ваши товары:
                    |
                    span.input-example 119203059
                    | ,
                    |
                    span.input-example 124366343
                    | ,
                    |
                    span.input-example 59801844
            .app-products-pager 
                |
                |
                |
                |
                app-pager
    .app-products-table
        the-table
</template>

<script>
import RootIcon from "@/assets/icons/RootIcon"
import AppPager from "./AppPager"
import TheTable from "./TheTable"

export default {
    name: "AppProducts",
    components: { RootIcon, AppPager, TheTable },
}
</script>
<style lang="scss">
.app-products {
    max-width: 100rem;

    &-head {
        display: flex;
        align-items: center;
    }

    &-questions-btn {
        width: 1.5625rem;
        height: 1.5625rem;
        transition: color 0.3s ease;
        margin-left: 0.625rem;

        &:hover {
            color: $green;
            transition: color 0.3s ease;
        }
        &:active {
            color: #29bda7;
        }
    }

    &-counter {
        position: relative;
        bottom: -0.2em;
        color: $gray;
        font-size: 0.9375rem;
        line-height: 1.5625rem;
        margin-left: 1.25rem;
    }
    &-table {
        margin-top: 1.875rem;
    }
}

.filters {
    margin-top: 1.875rem;
    &-control {
        display: flex;
        justify-content: space-between;
        margin-top: 1.875rem;
    }
    & .input-wrap {
        width: 46.615rem;
        margin-top: 0.5rem;
        margin-bottom: 0.25rem;
        gap: 1.25rem;
        pointer-events: none;
    }
}
</style>
