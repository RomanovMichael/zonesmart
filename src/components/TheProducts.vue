<template>
    <section class="products tile">
        <div class="products-head flex --align-center">
            <h2 class="products-title">Мои товары</h2>
            <div class="products-title-wrap flex --align-center">
                <button type="button"><RootIcon name="QuestionIcon" /></button>
                <span
                    >{{ $store.state.pager.limit }} из
                    {{ $store.state.pager.count }}</span
                >
            </div>
        </div>
        <div v-if="all_is_selected" class="panel flex">
            <div class="">
                <!-- <div class="checked-count">
                    Выбрано {{ checked_products.length }} из
                    {{ get_goods.length }}
                </div> -->
                <!-- <button class="btn" @click="deleteCheckedProducts">
                    Удалить выделенные
                </button> -->
            </div>
            <!-- <div class="">
                <input type="text" @input="changePriceForAllProducts" />
                <input type="text" />
            </div> -->
        </div>
        <table>
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
                                {{ item.min_price }}
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
                                {{ item.max_price }}
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
        <div class="paginator">
            <a
                v-for="p in $store.getters.get_pager_count"
                :key="p"
                class="prev"
                href="#"
                @click.prevent="setCurrentPage(p)"
                >{{ p }}</a
            >
        </div>
    </section>
</template>

<script>
import RootIcon from "@/assets/icons/RootIcon"

export default {
    name: "TheProducts",
    components: { RootIcon },
    computed: {
        get_goods() {
            return this.$store.getters["get_goods"]
        },
        all_is_selected() {
            return this.$store.getters.get_selected_products.length
        },
    },
    methods: {
        // Выделение всех элементов
        toggleAllProducts(e) {
            const flag = e.target.checked
            this.$store.commit("UPDATE_ALL_IS_SELECTED", flag)
        },
        // Выделение одного элемента
        toggleProduct(id) {
            this.$store.commit("UPDATE_IS_SELECTED", id)
        },
        async setCurrentPage(page_number) {
            this.$store.commit("SET_CURRENT_PAGE", page_number)
            await this.$store.dispatch("getProducts")
        },
        async pagen(vector) {
            await this.$store.dispatch("getProducts", vector)
        },

        // changePriceForAllProducts(e) {
        //     this.checked_products.forEach(
        //         (el) => (el.min_price = e.target.value)
        //     )
        // },
        async getProducts() {
            await this.$store.dispatch("getProducts")
        },
        // checkItem(item) {
        //     const index = this.checked_products.indexOf(item)
        //     if (index !== -1) {
        //         this.checked_products.splice(index, 1)
        //         return
        //     }
        //     this.checked_products.push(item)
        // },
        // deleteCheckedProducts() {
        //     this.$store.dispatch("deleteCheckedProducts", this.checked_products)
        // },
    },
    async mounted() {
        await this.$store.dispatch("getProducts")
    },
}
</script>
<style lang="scss">
.products {
    max-width: 100rem;
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

.paginator {
    max-width: 480px;
    padding: 10px;
    margin: auto;
    white-space: nowrap;
    text-align: center;
}

.paginator a,
.paginator span {
    display: inline-block;
    min-width: 20px;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    color: white;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    background: #8f3d93;
}

.paginator .prev {
    margin-right: 20px;
    background-repeat: no-repeat;
    background-position: 0 0;
}

.paginator .next {
    margin-left: 20px;
    text-indent: -1000px;
    background-repeat: no-repeat;
    background-position: 0 -40px;
}

.paginator .current {
    background-color: #4dd33f;
}

.paginator .disabled {
    opacity: 0.3;
}

.paginator a:hover {
    background-color: #4dd33f;
}
</style>
