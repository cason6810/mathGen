<template>
    <span ><input @keyup="test($el)" v-model="inputNum"/></span>
</template>
<script>
export default {
    name: "numInput",
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
    },
    data() {
        return {
            inputNum: ''
        }
    },
    methods: {
        test() {
            this.$emit('subInput',{
                index: this.index,
                num: this.inputNum
            })
        }
    }
}
</script>