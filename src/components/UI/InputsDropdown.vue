<template >
    <div class="inputs-dropdown">
        <div class="inputs-dropdown__head" :class="{'on': listActive}" @click="listActive = !listActive">
            <span v-if="selectedValue">{{ selectedValue }}</span>
            <span v-else>{{listName}}</span>
            <img src="/svg/arrowDropdown.svg" alt="">
        </div>
        <transition name="slide">
            <div class="inputs-dropdown__body" v-if="listActive" v-click-outside="() => {listActive = !listActive}">
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
import vClickOutside from "click-outside-vue3"

export default {
    components: { Checkbox },
    emits: ['update:modelValue'],
    directives: {
      clickOutside: vClickOutside.directive
    },
    props: {
        listName: String,
        inpustArray: [Array, Object],
        modelValue: {
            type: [String, Number],
            default: null,
        },
    },
    data() {
        return {
            listActive: false,
            selectedValue: null
        };
    },
    created() {
        if (this.modelValue !== undefined && this.modelValue !== '') {
            this.selectedValue = this.modelValue;
        }
    },
    watch: {
        modelValue(newValue) {
            if (newValue !== undefined && newValue !== '') {
                this.selectedValue = newValue;
            }
        },
    },
    methods: {
        handleClick(value) {
            this.selectedValue = value
            this.$emit('update:modelValue', value)
            this.listActive = false
        }
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
        box-shadow: 0px 6px 20px 0px rgba(63, 36, 5, 0.04);
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