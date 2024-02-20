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
        <div class="products-table">
            <TheTable />
        </div>
    </section>
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
</style>
