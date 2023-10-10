<template >
    <div class="inputs-dropdown">
        <div class="inputs-dropdown__head" :class="{'on': listActive}" @click="listActive = !listActive">
            Категории
            <img src="/svg/arrowDropdown.svg" alt="">
        </div>
        <transition name="slide">
            <div class="inputs-dropdown__body" v-show="listActive">
                <div class="inputs-dropdown__body-label">
                    Европейский размер
                </div>
                <Checkbox v-for="(item, index) in 5" :key="index">Тест</Checkbox>
            </div>
        </transition>
    </div>
</template>
<script>
import Checkbox from './Checkbox.vue';

export default {
    data() {
        return {
            listActive: false,
        };
    },
    components: { Checkbox }
}
</script>
<style lang="scss">
.inputs-dropdown
{
    position: relative;
    border-bottom: 1px solid rgba(142, 142, 169, 0.12);
    &__head
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .4rem 0 1.8rem 0;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
        border-bottom:1px solid #A6A5A3;
        cursor: pointer;
        img
        {
            width: 1.6rem;
            height: 2.4rem;
            object-fit: contain;
            transform: rotate(180deg);
            user-select: none;
            -webkit-user-drag: none;
            transition: .2s;
        }
        &.on
        {
            img
            {
                transform: rotate(0);
            }
        }
    }
    &__body
    {
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        padding: 2.4rem 1.6rem;
        background: #FFFEFD;
        box-shadow: 0px 6px 20px 0px rgba(63, 36, 5, 0.04);
        display: flex;
        flex-direction: column;
        row-gap: 1.2rem;
        &-label
        {
            color: #A6A5A3;
            font-size: 1.7rem;
            line-height: 1.4em;
            letter-spacing: -0.17px;
        }
    }
    &.last
    {
        border-bottom: 0;
    }
}
@media (max-width: 991px) {
    .inputs-dropdown
    {
        &__head
        {
            padding: 4px 0 16px 0;
            font-size: 16px;
            img
            {
                width: 18px;
                height: 18px;
            }
        }
        &__body
        {
            padding: 16px;
            row-gap: 12px;
            &-label
            {
                font-size: 14px;
            }
        }
        &.last
        {
            border-bottom: 0;
        }
    }
}
@media (max-width: 768px) {
    .inputs-dropdown
    {
        &__head
        {
            font-size: 14px;
        }
    }
}
</style>