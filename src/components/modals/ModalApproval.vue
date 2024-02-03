<template>
    <div class="modal-approval" style="display: none;" ref="modalEl" >
        <button class="close-modal" @click="closeFancybox()">
            <img src="/svg/close.svg" alt="">
        </button>
        <div class="modal-approval__label" v-html="label ?? ''"></div>
        <div class="modal-approval__text" v-html="subText ?? '' +' '+ destination ?? ''"></div>
        <div class="modal-approval__input">
            <div class="modal-approval__input-text">{{ inputLabel ?? ''}}</div>
            <MainInput :placeholder="inputPlaceholder"></MainInput>
        </div>
        <MainBtn class-name="btn-primary w-100" @click="modalEvent">{{buttonText ?? ''}}</MainBtn>
    </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import { Fancybox } from '@fancyapps/ui';

import MainInput from '../UI/MainInput.vue';
import MainBtn from '../UI/MainBtn.vue';

export default {
    components: { MainInput, MainBtn },
    props: {
        label: String,
        subText: String,
        inputLabel: String,
        inputPlaceholder: String,
        buttonText: String,
        destination: String,
    },
    computed:{
        ...mapState(['headerPadding',]
        ),
    },
    methods: {
        closeFancybox(){
            Fancybox.close()
        },
        setPaddingModal() {
            if (window.innerWidth < 600) {
                if(this.$refs.modalEl)
                this.$refs.modalEl.style.maxHeight = window.innerHeight - this.paddingTop + 'px';
            }
        },
        modalEvent() {
            this.$emit('modal-event')
        }
        
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
.modal-approval
{
    position: relative;
    max-height: 35rem;
    height: auto;
    width: 48rem;
    &.fancybox__content
    {
        padding: 3.2rem;
    }
    
    &__label
    {
        margin-bottom: 1.2rem;
        color: $primary;
        font-size: 2.8rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.504px;
    }
    &__text
    {
        margin-bottom: 3.4rem;
        color:#827F7D;
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.55em;
        letter-spacing: -0.216px;
    }
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
}
@media (max-width: 960px) {
    .modal-approval
    {
        height: auto;
        max-height: 800px;
        width: 500px;
        &__label
        {
            margin-bottom:16px;
            font-size: 24px;
            font-weight: 500;
        }
        &__text
        {
            margin-bottom: 24px;
            font-size: 14px;
        }
        &__input
        {
            margin-bottom: 24px;
            &-text
            {
                margin-bottom: 0;
                font-size: 10px;
            }
        }
    }
}
@media (max-width: 600px) {
    .modal-base__wrap
    {
        .fancybox__slide::after
        {
            margin: 0;
        }
    }
    .modal-approval
    {
        max-height: 90vh;
        height: 100%;
        width: 100%;
        padding: 48px 20px !important;
        
    }
}
</style>