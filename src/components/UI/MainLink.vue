<template lang="">
    <router-link class="btn" :to="destitation ?? '#'" :class="className" :type="type" :disabled="disabled">
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
        destitation: String,

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