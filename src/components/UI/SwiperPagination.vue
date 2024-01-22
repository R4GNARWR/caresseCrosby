<template lang="">
    <div class="custom-pagination"></div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.custom-pagination
{
    position: absolute;
    right: 6.6rem;
    bottom: 6rem;
    display: flex;
    column-gap: .8rem;
    z-index: 1;
    .swiper-pagination-bullet
    {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: #FFFFFF;
        border: 1px solid $primary;
        transition: .3s;
        &-active
        {
            background: $primary;
        }
    }
}
@media (max-width: 600px) {
    .custom-pagination
    {
        width: 100%;
        left: 0;
        right: 0;
        justify-content: center;
        column-gap: 8px;
        .swiper-pagination-bullet
        {
            width: 12px;
            height: 12px;
        }
    }
}
</style>