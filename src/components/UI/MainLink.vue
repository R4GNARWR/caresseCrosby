<template lang="">
    <router-link class="btn" :to="destination ?? '#'" :class="className" :type="type" :disabled="disabled">
        <slot></slot>
    </router-link>
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
        destination: String,
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'button'
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss">
    .btn
    {
        text-decoration: none;
    }
</style>