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
        width: 1rem;
        height: 2px;
        background: #D9D9D9;
        transition: .3s;
        &-active
        {
            width: 3rem;
            height: 2px;
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
        .swiper-pagination-bullet
        {
            width: 10px;
            &-active
            {
                width: 30px;
            }
        }
    }
}
</style>