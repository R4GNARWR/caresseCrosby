<template>
    <div class="detail__links">
        <span>Запишитесь к брафиттеру</span>
        <div class="detail__links-socials">
            <a href="">
                <img src="/svg/telegram.svg" alt="">
            </a>
            <a href="">
                <img src="/svg/whatsapp.svg" alt="">
            </a>
            <a href="">
                <img src="/svg/vk.svg" alt="">
            </a>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.detail__links
{
    margin-top: 6.4rem;
    display: flex;
    column-gap: 4.9rem;
    padding: 4rem 5.6rem;
    background-color: #F9F7F5;
    span
    {
        color: $primary;
        font-size: 2.8rem;
        font-weight: 500;
        line-height: 1.3em;
        letter-spacing: -0.504px;
    }
    &-socials
    {
        display: flex;
        column-gap: 3.2rem;
        a
        {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2.5rem 4.8rem;
            border: 1px solid #C0B09D;
            img
            {
                width: 3.5rem;
                height: 3.5rem;
                object-fit: contain;
            }
        }
    }
}
@media (max-width: 960px) {
    
}
@media (max-width: 600px) {
    .detail__links
    {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        column-gap: 0;
        padding: 32px;
        span
        {
            font-size: 28px;
        }
        &-socials
        {
            display: flex;
            column-gap: 6px;
            a
            {
                padding: 24px;
                img
                {
                    width: 24px;
                    height: 24px;
                    object-fit: contain;
                }
            }
        }
    }
}
</style>