<template>
    <div class="modal-tocart" style="display: none;" ref="modalEl">
        <button class="close-modal" @click="closeFancybox()">
            <img src="/svg/close.svg" alt="">
        </button>
        <div class="modal-approval__label">Спасибо!</div>
        <div class="modal-approval__text">Вы добавили товар в корзину</div>
        <div class="modal-tocart__product">
            <img src="/img/product-detail.jpg" alt="">
            <div class="modal-tocart__product-info">
                Nessa Selena Bra
                <span>6 900 ₽</span>
            </div>
        </div>
        <div class="modal-tocart__buttons">
            <MainLink class-name="btn-primary w-100" @click="closeFancybox()" :destination="'/cart'" >Оформить заказ</MainLink>
            <MainBtn class-name="btn-white outline w-100" @click="closeFancybox()">Вернуться к покупкам</MainBtn>
        </div>

    </div>
</template>
<script>
import { useSettingsStore } from '../../store/settingsStore';
import { Fancybox } from '@fancyapps/ui';

import Input from '../UI/Input.vue';
import MainBtn from '../UI/MainBtn.vue';
import MainLink from '../UI/MainLink.vue';

export default {
    components: { Input, MainBtn, MainLink },
    props: {
        label: String,
        subText: String,
        destination: String,
    },
    computed: {
        paddingTop(){return useSettingsStore().headerPadding}, 
    },
    methods: {
        closeFancybox(){
            Fancybox.close()
        },
        setPaddingModal() {
            if (window.innerWidth < 600) {
                this.$refs.modalEl.style.maxHeight = window.innerHeight - this.paddingTop + 'px';
                console.log(this.$refs.modalEl.style.maxHeight)
            }
        },
        
    },
    mounted() {
        this.setPaddingModal();
        window.addEventListener('resize', this.setPaddingModal);
    },
    beforeDestroy() {
        // удаляем обработчик события при уничтожении компонента
        window.removeEventListener('resize', this.setPaddingModal);
    }
}
</script>
<style lang="scss">
.modal-tocart
{
    position: relative;
    max-height: 89rem;
    height: auto;
    width: 48rem;
    padding: 3.2rem;
    &__input
    {
        margin-bottom: 3.4rem;
        &-text
        {
            margin-bottom: -.4rem;
            color: #827F7D;
            font-size: 1.1rem;
            line-height: 1.4em;
            letter-spacing: 0.055px;
        }
    }
    &__buttons
    {
        display: flex;
        flex-direction: column;
        row-gap: 1.6rem;
    }
}
.modal-tocart__product
{
    img
    {
        margin-bottom: 1.2rem;
        width: 100%;
        height: 50rem;
        object-fit: cover;
    }
    &-info
    {
        margin-bottom: 3.2rem;
        display: flex;
        justify-content: space-between;
        color: $primary;
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.55em;
        letter-spacing: -0.216px;
        span
        {
            font-weight: 700;
        }
    }
}
@media (max-width: 960px) {
    .modal-tocart
    {
        height: auto;
        max-height: 90vh;
        width: 500px;
        padding: 32px 40px;
    }
    .modal-tocart__product
    {
        img
        {
            margin-bottom: 12px;
            height: 75rem;
        }
        &-info
        {
            margin-bottom: 24px;
            font-size: 18px;
        }
    }
}
@media (max-width: 600px) {

    .modal-tocart__product
    {
        img
        {
            height: 280px;
        }
    }
    .modal-tocart
    {
        height: 100%;
        width: 100%;
        padding: 48px 20px 20px 20px;
        .btn
        {
            padding-top: 16px !important;
            padding-bottom: 16px !important;
        }
    }
}
</style>