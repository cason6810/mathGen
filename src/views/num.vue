<template>
    <span>{{val}}</span>
</template>
<script>
export default {
    name: "num",
    props: {
        data: {
            type: Object
        },
        index: {
            type: Number
        },
        val: {
            type: [Number, String]
        }
    }
}
</script>