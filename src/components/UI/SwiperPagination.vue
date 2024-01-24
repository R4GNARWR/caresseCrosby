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
    width: 100%;
    justify-content: center;
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
        border: 1px solid #867B6E;
        transition: .3s;
        &-active
        {
            border: $primary;
            background: $primary;
        }
    }
}
@media (max-width: 600px) {
    .custom-pagination
    {
        column-gap: 8px;
        .swiper-pagination-bullet
        {
            width: 12px;
            height: 12px;
        }
    }
}
</style>