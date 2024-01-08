<template>
    <div class="arrow-up" @click="scrollUp">
        ↑
    </div>
</template>
<script>
export default {
    methods: {
        scrollUp() {
            window.scrollTo(0,0)
        }
    }
}
</script>
<style lang="scss">
    .arrow-up
    {
        cursor: pointer;
        position: fixed;
        left: 6rem;
        bottom: 4rem;
        height: 5rem;
        width: 5rem;
        background-color: $primary;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.8rem;
        border: 1px solid #FFFFFF;
        z-index: 10000;
    }
    @media (max-width:960px) {
        .arrow-up
        {
            width: 50px;
            height: 50px;
            font-size: 28px;
            left: 20px;
            bottom: 20px;
        }
    }
</style>