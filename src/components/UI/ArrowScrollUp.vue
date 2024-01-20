<template>
    <div class="arrow-up" :class="{'show': showButton}" @click="scrollUp">
        ↑
    </div>
</template>
<script>
export default {
    data() {
        return {
            showButton: false,
        }
    },
    computed: {
        windowHeight() {
            return window.innerHeight
        },
    },
    methods: {
        scrollUp() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        },
        checkHeight() {
            const currentScroll = window.scrollY
            if(currentScroll > this.windowHeight) {
                this.showButton = true
            } else {
                this.showButton = false
            }
        }
    },
    created() {
        window.addEventListener('scroll', this.checkHeight)
    }

}
</script>
<style lang="scss">
    .arrow-up
    {
        cursor: pointer;
        position: fixed;
        right: 14rem;
        bottom: 1.6rem;
        height: 6rem;
        width: 6rem;
        background-color: #867B6E;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3.2rem;
        border: 1px solid #FFFFFF;
        z-index: 10000;
        opacity: 0;
        pointer-events: none;
        border-radius: 50%;
        transition: .3s;
        overflow: hidden;
        &.show
        {
            opacity: 1;
            pointer-events: all;
        }
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