<template >
    <ul class="pagination">
        <li class="pagination-item prev"><a href="">
            <img class="d-md-none d-block" src="/svg/pagination-arrow.svg" alt="">
            ...
        </a></li>
        <li class="pagination-item active"><a href="">1</a></li>
        <li class="pagination-item"><a href="">2</a></li>
        <li class="pagination-item"><a href="">3</a></li>
        <li class="pagination-item"><a href="">4</a></li>
        <li class="pagination-item"><a href="">5</a></li>
        <li class="pagination-item next"><a href="">
            <img class="d-md-none d-block" src="/svg/pagination-arrow.svg" alt="">
            ...
        </a></li>
        <button class="btn btn-white outline">Дальше</button>
    </ul>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.pagination
{
    margin-top: 7.2rem;
    display: flex;
    column-gap: .8rem;
    align-items: center;
    list-style: none;
    &-item
    {
        width: 3.6rem;
        height: 4rem;
        color: #827F7D;
        font-size: 1.6rem;
        font-weight: 500;
        transition: .2s;
        border: 1px solid #FFF;
        &.active
        {
            background:#DAD1C6;
            color: $primary;
        }
        &:hover
        {
            border: 1px solid #DAD1C6;
        }
        a
        {
            padding: 1.6rem 1.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: inherit;
        }
    }
    .btn
    {
        padding: 1.4rem 4rem;
    }
}
@media (max-width: 600px) {
    .pagination
    {
        justify-content: center;
        &-item
        {
            width: 36px;
            height: 40px;
            font-size: 16px;
            a
            {
                padding: 16px 12px;
            }
            &.next,
            &.prev
            {
                font-size: 0px;
                a
                {
                    padding: 14px 12px;
                }
                img
                {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
            &.prev
            {
                img
                {
                    transform: rotate(180deg);
                }
            }
            
        }
        .btn
        {
            display: none;
        }
    }
}
</style>