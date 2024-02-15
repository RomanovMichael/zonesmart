<template lang="pug">
#app hello zonesmart
</template>

<style lang="scss">
@font-face {
    font-family: "Graphik";
    src: local("GraphikLCG-Regular"), local("GraphikLCG-Regular"),
        url("~@/assets/fonts/GraphikLCG-Regular.woff2") format("woff2"),
        url("~@/assets/fonts/GraphikLCG-Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: "Graphik";
    src: local("GraphikLCG-Semibold"), local("GraphikLCG-Semibold"),
        url("~@/assets/fonts/GraphikLCG-Semibold.woff2") format("woff2"),
        url("~@/assets/fonts/GraphikLCG-Semibold.woff") format("woff");
    font-weight: 600;
    font-style: normal;
}

#app {
    font-family: Graphik;
    font-weight: 600;
}
</style>
