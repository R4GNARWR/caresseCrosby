<template >
    <div class="inputs-dropdown" ref="dropdown">
        <div class="inputs-dropdown__head" :class="{'on': listActive}" @click="toggleShow">
            <span v-if="selectedValue">{{ selectedValue }}</span>
            <span v-else>{{listName}}</span>
            <img src="/svg/arrowDropdown.svg" alt="">
        </div>
        <transition name="slide">
            <div class="inputs-dropdown__body" v-if="listActive">
                <div class="inputs-dropdown__body-item">
                    <div class="inputs-dropdown__body-label">{{listName}}</div>
                    <Checkbox :type="'radio'"
                    v-model="selectedValue"
                    :index="1"
                    :value="item.value"
                    @click-event="handleClick(item.value)"
                    v-for="(item, index) in inpustArray"
                    :key="index">{{ item.value }}</Checkbox>
                </div>
                
            </div>
        </transition>
    </div>
</template>
<script>

import Checkbox from './Checkbox.vue';
import { ref, onMounted, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
    components: { Checkbox },
    emits: ['update:modelValue'],
    props: {
        listName: String,
        inpustArray: [Array, Object],
        modelValue: {
            type: [String, Number],
            default: null,
        },
    },
    setup(props, {emit}) {
        const listActive = ref(false);
        const selectedValue = ref('');
        const dropdown = ref(null);

        const handleClick = (value) => {
            selectedValue.value = value;
            emit('update:modelValue', value);
            listActive.value = false;
        };

        const toggleShow = () => {
            listActive.value = !listActive.value;
        };

        onMounted(() => {
            if (props.modelValue !== undefined && props.modelValue !== '') {
                selectedValue.value = props.modelValue;
            }

            onClickOutside(dropdown, () => {
                listActive.value = false;
            });
        });

        watch(() => props.modelValue, (newValue) => {
            if (newValue !== undefined && newValue !== '') {
                selectedValue.value = newValue;
            }
        });

        return {
            listActive,
            selectedValue,
            dropdown,
            handleClick,
            toggleShow
        };
    },
    
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
            transform: rotate(0deg);
            user-select: none;
            -webkit-user-drag: none;
            transition: .2s;
        }
        &.on
        {
            img
            {
                transform: rotate(180deg);
            }
        }
    }
    &__body
    {
        max-height: calc(2.9rem * 8);
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        padding: 2.4rem 1.6rem;
        background: #FFFEFD;
        box-shadow: 0px 6px 6px 6px rgba(63, 36, 5, 0.04);
        display: flex;
        flex-direction: column;
        row-gap: 1.2rem;
        z-index: 200;
        overflow-y: scroll;
        &-item
        {
            display: flex;
            flex-direction: column;
            row-gap: 1.2rem;
        }
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
@media (max-width: 960px) {
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
            max-height: calc(27px * 8);
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
@media (max-width: 600px) {
    .inputs-dropdown
    {
        &__head
        {
            font-size: 14px;
        }
    }
}
</style>