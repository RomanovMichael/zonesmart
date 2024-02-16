<template>
    <component :is="name" />
</template>

<script>
import * as icons from "../icons/variants"

export default {
    name: "RootIcon",
    components: { ...icons },
    props: {
        name: {
            type: String,
            required: true,
            validator(value) {
                return Object.keys(icons).includes(value)
            },
        },
    },
}
</script>
