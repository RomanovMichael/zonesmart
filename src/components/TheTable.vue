<template lang="pug">
table.table
    thead
        tr
            th
                .table-cell
                    label.checkbox
                        input(
                            type="checkbox",
                            :checked="all_is_selected",
                            @change="toggleAllProducts"
                        )
                        .flex.--align-center
                            .checkbox-trigger.checkbox-trigger--main
            th
                .table-cell
                    .table-cell-inner Фото
            th
                .table-cell
                    .table-cell-inner Артикул продавца
            th
                .table-cell
                    div Бренд
                    button.table-cell-btn
                        root-icon(name="ArrowIcon")
            th
                .table-cell
                    .table-cell-inner Название
            th
                .table-cell
                    div Остаток, шт.
                    button.table-cell-btn
                        root-icon(name="ArrowIcon")
            th
                .table-cell
                    div Текущая цена
                    button.table-cell-btn
                        root-icon(name="ArrowIcon")
            th
                .table-cell
                    div Минимальная цена
                    button.table-cell-btn
                        root-icon(name="ArrowIcon")
            th
                .table-cell
                    div Максимальная цена
                    button.table-cell-btn
                        root-icon(name="ArrowIcon")
            th
                .table-cell
                    div Удалить
    tr
    tr(v-if="all_is_selected")
        .table-panel
            td
            td
                .table-cell
                    .checked-count 
                        |
                        |
                        |
                        |
                        | Выбрано
                        | {{ all_is_selected }}
                        | из
                        | {{ get_goods.length }}
            td
                .table-cell
                    button.panel-btn(@click="deleteSelectedProducts")
                        span
                            root-icon(name="DeleteSmallIcon")
                        | Удалить выделенные
            td
                .table-cell Для всех выделенных
            td
                .table-cell
                    .input.input--sm
                        .input-wrap
                            input.input-inner(
                                v-model="min_price_setter",
                                type="text",
                                @input="setPriceForSelected($event, 'min_price')"
                            )
            td
                .table-cell
                    .input.input--sm
                        .input-wrap
                            input.input-inner(
                                v-model="max_price_setter",
                                type="text",
                                @input="setPriceForSelected($event, 'max_price')"
                            )
            td
    tbody
        tr(v-for="item in get_goods", :key="item.id")
            td
                .table-cell
                    label.checkbox
                        input(
                            type="checkbox",
                            :checked="item.selected",
                            @change="toggleProduct(item.id)"
                        )
                        .flex.--align-center
                            .checkbox-trigger
            td
                .table-cell
                    root-icon(v-if="!item.images[0]", name="NophotoIcon")
                    img.table-cell-image(
                        v-else,
                        style="width: 50px; height: 50px",
                        :src="item.images[0]",
                        alt="item.title"
                    )
            td
                .table-cell
                    button.table-cell-btn.table-cell-btn--copy(
                        @click="copyToClipboard(item.remote_id)"
                    )
                        root-icon(name="LinkIcon")
                    div {{ item.remote_id }}
            td
                .table-cell
                    .table-cell-inner
                        | {{ item.brand_name }}
            td
                .table-cell
                    .table-cell-inner
                        | {{ item.title }}
            td
                .table-cell
                    .table-cell-inner
                        | {{ item.quantity }}
            td
                .table-cell
                    .table-cell-inner
                        | {{ item.price | fixTo }}
                        span.rouble 
                            |
                            |
                            |
                            |
                            |
                            | ₽
            td
                .table-cell
                    .input.input--sm
                        .input-wrap
                            input.input-inner(
                                v-model="item.min_price",
                                type="text"
                            )
            td
                .table-cell
                    .input.input--sm
                        .input-wrap
                            input.input-inner(
                                v-model="item.max_price",
                                type="text"
                            )
            td
                .table-cell
                    button.table-cell-btn
                        root-icon(name="DeleteIcon")
</template>

<script>
import RootIcon from "@/assets/icons/RootIcon"
export default {
    name: "TheTable",
    components: { RootIcon },
    data() {
        return {
            min_price_setter: "",
            max_price_setter: "",
        }
    },
    filters: {
        fixTo(val) {
            if (!val || val == 0) {
                return ""
            } else {
                val = parseFloat(val)
                val = new Intl.NumberFormat("ru-RU", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(val)

                return val
            }
        },
    },
    computed: {
        get_goods() {
            return this.$store.getters["get_goods"]
        },
        all_is_selected() {
            return this.$store.getters.get_selected_products.length
        },
    },
    watch: {
        "$store.getters.get_selected_products": function () {
            if (this.min_price_setter !== "") {
                this.setPriceForSelected("min_price", this.min_price_setter)
            }

            if (this.max_price_setter !== "") {
                this.setPriceForSelected("max_price", this.max_price_setter)
            }
        },
    },
    methods: {
        // Получение списка продуктов
        async getProducts() {
            await this.$store.dispatch("getProducts")
        },
        // Выделение всех элементов
        toggleAllProducts(e) {
            const flag = e.target.checked
            this.$store.commit("UPDATE_ALL_IS_SELECTED", flag)
        },
        // Выделение одного элемента
        toggleProduct(id) {
            this.$store.commit("UPDATE_IS_SELECTED", id)
        },
        // Удаление элементов
        deleteSelectedProducts() {
            this.$store.dispatch("deleteSelectedProducts")
        },
        // Изменение цены для выделенных элементов
        setPriceForSelected(event, type) {
            const price_type = type
            const value = event.target.value
            this.$store.commit("SET_PRICE_FOR_SELECTED", { price_type, value })
        },
        handleError(e) {
            throw e
        },
        copyToClipboard(info) {
            try {
                navigator.clipboard.writeText(info)
            } catch (error) {
                this.handleError(error)
            }
        },
    },
    async mounted() {
        await this.$store.dispatch("getProducts")
    },
}
</script>
<style lang="scss">
.table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.937rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    overflow-x: auto;
    display: grid;
    grid-template-columns:
        minmax(2rem, 2.8125rem) minmax(4.125rem, 4.375rem) minmax(
            9.5rem,
            9.875rem
        )
        minmax(8.975rem, 9.062rem) minmax(23.5rem, 23.75rem) minmax(
            8.275rem,
            8.5rem
        )
        minmax(8.875rem, 9rem)
        minmax(11.875rem, 12rem) minmax(11.75rem, 11.8125rem) minmax(3.75rem, 3.75rem);

    & * {
        flex-wrap: nowrap;
    }

    & th {
        color: $gray;
        font-weight: 400;
        line-height: 1.5625rem;
        vertical-align: middle;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        height: 3.75rem;

        & button {
            vertical-align: middle;
            color: inherit;
        }
    }

    & thead,
    tbody,
    tr {
        display: contents;
    }

    & th {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
    }

    & td {
        display: table-cell;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        height: 3.75rem;
    }

    &-cell {
        height: 100%;
        display: flex;
        align-items: center;

        &.table-cell--photo {
            justify-content: center;
        }

        &-inner {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding-right: 1rem;
        }

        &-btn {
            color: $gray;
            transition: color 0.3s ease;

            &:hover {
                color: $black;
                transition: color 0.3s ease;
            }

            &.table-cell-btn--copy {
                margin-right: 0.25rem;
            }
        }
    }

    &-panel {
        display: grid;
        grid-column: span 10;
        grid-template-columns:
            1.25rem minmax(8rem, 8.8125rem) 1fr minmax(11rem, 11.0625rem) minmax(
                11.875rem,
                12rem
            )
            minmax(11.75rem, 11.8125rem) minmax(3.75rem, 3.75rem);
        background: #dee1e3;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);

        & .panel-btn {
            vertical-align: middle;
            background-color: $button_gray;
            border-radius: 0.375rem;
            font-size: 1rem;
            padding: 0.5rem 0.75rem;
            transition: all 0.3s ease;
            font-weight: 600;

            &:hover {
                background: rgba(0, 0, 0, 0.05);
            }

            & span {
                margin-right: 0.5rem;
            }
        }

        & td {
            border: none;
        }
    }
}
</style>
