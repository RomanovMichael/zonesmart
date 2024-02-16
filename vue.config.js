const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: `/zonesmart/`,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/styles/_main.scss";
                `,
            },
        },
    },
})
