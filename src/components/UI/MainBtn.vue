<template lang="">
    <button class="btn" :class="className" :type="type" :disabled="disabled">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name : "MainButton",
    data(){
        return{

        }
    },
    props: {
        className: String,
        type: String,
        disabled: Boolean
    },
    methods: {

    }
}
</script>
<style lang="">
    
</style>