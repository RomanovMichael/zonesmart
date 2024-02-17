<template>
    <div id="app">
        <router-view></router-view>

        <section class="products">
            <button @click="deleteCheckedProducts">Удалить выделенные</button>
            <div v-for="item in get_goods" :key="item.id" class="products-item">
                <input type="checkbox" @change="checkItem(item.id)" />
                <div>images: {{ item.images }}</div>
                <img
                    style="width: 100px; height: 100px"
                    :src="item.images[0]"
                    alt=""
                />
                <div>remote_id: {{ item.remote_id }}</div>
                <div>brand_name: {{ item.brand_name }}</div>
                <div>title: {{ item.title }}</div>
                <div>quantity: {{ item.quantity }}</div>
                <div>price: {{ item.price }}</div>
                <div>min_price: {{ item.min_price }}</div>
                <div>max_price: {{ item.max_price ?? "нет" }}</div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            checked_products: [],
        }
    },
    computed: {
        get_goods() {
            return this.$store.getters["get_goods"]
        },
    },
    methods: {
        async getProducts() {
            await this.$store.dispatch("getProducts")
        },
        checkItem(id) {
            let index = this.checked_products.indexOf(id)
            if (index !== -1) {
                this.checked_products.splice(index, 1)
                return
            }
            this.checked_products.push(id)
        },
        deleteCheckedProducts() {
            this.$store.dispatch("deleteCheckedProducts", this.checked_products)
        },
    },
}
</script>
