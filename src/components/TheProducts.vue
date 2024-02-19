<template>
    <section class="products tile">
        <div class="products-head flex --align-center">
            <h2 class="products-title">Мои товары</h2>
            <div class="products-title-wrap flex --align-center">
                <button type="button"><RootIcon name="QuestionIcon" /></button>
                <span
                    >{{ $store.state.pager.rest_count }} из
                    {{ $store.state.pager.count }}</span
                >
            </div>
        </div>
        <div class="products-filters filters">
            <div class="filters-text">
                <p class="filters-text-item">
                    Добавьте товары вашего магазина из одной товарной и ценовой
                    категории (разница цены не больше 15%)
                </p>
                <br />
                <br />
                <p class="filters-text-item">
                    Для добавления нескольких товаров введите несколько
                    артикулов через запятую или используя клавишу Enter
                </p>
            </div>
            <div class="filters-control flex --just-space">
                <div class="input">
                    <label class="input-label caption"
                        >Добавление товаров</label
                    >
                    <div class="input-wrap">
                        <input
                            class="input-inner"
                            type="text"
                            placeholder="Введите артикул продавца, артикул WB или ссылку на товар"
                        />
                        <button class="btn" disabled>Добавить</button>
                    </div>
                    <label class="input-label caption"
                        >Например ваши товары: <span>119203059</span>,
                        <span>124366343</span>, <span>59801844</span></label
                    >
                </div>
                <AppPager />
            </div>
        </div>
        <div v-if="all_is_selected" class="panel flex">
            <div class="">
                <div class="checked-count">
                    Выбрано {{ all_is_selected }} из
                    {{ get_goods.length }}
                </div>
                <button class="btn" @click="deleteSelectedProducts">
                    Удалить выделенные
                </button>
            </div>
            <div class="">
                <input
                    v-model="min_price_setter"
                    type="text"
                    @input="setPriceForSelected($event, 'min_price')"
                />
                <input
                    v-model="max_price_setter"
                    type="text"
                    @input="setPriceForSelected($event, 'max_price')"
                />
            </div>
        </div>
        <div class="products-table">
            <table class="table">
                <thead>
                    <tr>
                        <th>
                            <div class="">
                                <input
                                    type="checkbox"
                                    :checked="all_is_selected"
                                    @input="toggleAllProducts"
                                />
                            </div>
                        </th>
                        <th><div class="">Фото</div></th>
                        <th><div class="">Артикул продавца</div></th>
                        <th>
                            <div class="flex --align-center">
                                <div>Бренд</div>
                                <button><RootIcon name="ArrowIcon" /></button>
                            </div>
                        </th>
                        <th><div class="">Название</div></th>
                        <th>
                            <div class="flex --align-center">
                                <div class="">Остаток, шт</div>
                                <button><RootIcon name="ArrowIcon" /></button>
                            </div>
                        </th>
                        <th>
                            <div class="flex --align-center">
                                <div class="">Текущая цена</div>
                                <button><RootIcon name="ArrowIcon" /></button>
                            </div>
                        </th>
                        <th>
                            <div class="flex --align-center">
                                <div class="">Минимальная цена</div>
                                <button><RootIcon name="ArrowIcon" /></button>
                            </div>
                        </th>
                        <th>
                            <div class="flex --align-center">
                                <div class="">Максимальная цена</div>
                                <button><RootIcon name="ArrowIcon" /></button>
                            </div>
                        </th>
                        <th><div class="">Удалить</div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in get_goods" :key="item.id">
                        <td>
                            <div class="">
                                <input
                                    type="checkbox"
                                    :checked="item.selected"
                                    @change="toggleProduct(item.id)"
                                />
                            </div>
                        </td>
                        <td>
                            <div class="">
                                <RootIcon
                                    v-if="!item.images[0]"
                                    name="NophotoIcon"
                                />
                                <img
                                    v-else
                                    style="width: 50px; height: 50px"
                                    :src="item.images[0]"
                                    alt=""
                                />
                            </div>
                        </td>
                        <td>
                            <div class="">
                                <div>{{ item.remote_id }}</div>
                            </div>
                        </td>
                        <td>
                            <div>{{ item.brand_name }}</div>
                        </td>
                        <td>
                            <div>{{ item.title }}</div>
                        </td>
                        <td>
                            <div>{{ item.quantity }}</div>
                        </td>
                        <td>
                            <div>{{ item.price }}</div>
                        </td>
                        <td>
                            <div class="input input--sm">
                                <div class="input-wrap">
                                    <input
                                        v-model="item.min_price"
                                        class="input-inner"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="input input--sm">
                                <div class="input-wrap">
                                    <input
                                        v-model="item.max_price"
                                        class="input-inner"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <button><RootIcon name="DeleteIcon" /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
import RootIcon from "@/assets/icons/RootIcon"
import AppPager from "./AppPager"

export default {
    name: "TheProducts",
    components: { RootIcon, AppPager },
    data() {
        return {
            min_price_setter: "",
            max_price_setter: "",
        }
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
    },
    async mounted() {
        await this.$store.dispatch("getProducts")
    },
}
</script>
<style lang="scss">
.products {
    max-width: 100rem;
    &-table {
        margin-top: 1.875rem;
    }
}

.filters {
    margin-top: 1.875rem;
    &-control {
        margin-top: 1.875rem;
        .input-wrap {
            width: 46.615rem;
            margin-top: 0.5rem;
            margin-bottom: 0.25rem;
            gap: 1.25rem;
        }
    }
}

thead,
tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

th {
    color: $gray;
    font-weight: 400;
}

tr {
    outline: none;
    position: relative;
    overflow: hidden;
    height: 3.75rem;
}

// .table-row {

// }

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.937rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    overflow-x: scroll;
    & .flex {
        flex-wrap: nowrap;
    }
}
.products-item {
    flex-wrap: nowrap;
    width: 100%;
    gap: 1rem;
}
.products-item * {
    text-align: left;
}

.table-head {
    flex-wrap: nowrap;
    justify-content: space-around;
}

.panel {
    background: $gray;
}
</style>
