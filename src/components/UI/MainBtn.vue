<template lang="">
    <button class="btn" :class="className" :type="type ?? 'button'" :disabled="disabled">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name : "MainButton",
    data(){
        return{
            
        }
    },
    props: {
        className: String,
        type: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        
    }
}
</script>
<style lang="scss">
.btn
{
    display: flex;
    padding: 1.4rem 3.2rem;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
    text-align: center;
    font-size: 1.6rem;
    line-height: 1.5em;
    transition: .3s;
    border-radius: 0;
    cursor: pointer;
    &:disabled,
    &.disabled
    {
        opacity: .5;
        pointer-events: none;
    }
    &-primary
    {
        color: #FFF !important;
        background: $primary !important;
        border: 1px solid $primary !important;
        outline: 0;
        &:focus-visible,
        &:hover,
        &:active,
        :not(.btn-check)+&:active,
        &:first-child:active,
        &.active,
        &.show
        {
            border: 1px solid $primary !important;
            background-color: #FFFFFF !important;
            color: $primary !important;
        }
        &.outline
        {
            border: 1px solid $primary !important;
            background-color: #FFFFFF !important;
            color: $primary !important;
            &:hover
            {
                color: #FFF !important;
                background: $primary !important;
                border: 1px solid $primary !important;
            }
        }
        &:disabled {
            opacity: 0.5;
        }
    }
    &-white
    {
        color: $primary;
        background: #FFF;
        border: 1px solid #FFF;
        outline: 0;
        &:focus-visible,
        &:hover,
        &:active,
        :not(.btn-check)+&:active,
        &:first-child:active,
        &.active,
        &.show
        {
            border: 1px solid $primary;
            background-color: $primary !important;
            color: #FFF;
        }
        &.outline
        {
            border: 1px solid #867B6E;
        }
    }
    &-gold
    {
        color: #867B6E;
        background: #FFF;
        border: 1px solid #867B6E;
        outline: 0;
        &:focus-visible,
        &:hover,
        &:active,
        :not(.btn-check)+&:active,
        &:first-child:active,
        &.active,
        &.show
        {
            color: #FFFFFF;
            background: #867B6E;
            border: 1px solid #867B6E;
        }
    }
    &-danger
    {
        color: #dc3545;
        background: #FFF;
        border: 1px solid #dc3545;
        outline: 0;
        &:focus-visible,
        &:hover,
        &:active,
        :not(.btn-check)+&:active,
        &:first-child:active,
        &.active,
        &.show
        {
            color: #FFFFFF;
            background: #dc3545;
            border: 1px solid #dc3545;
            i
            {
                color: #FFF !important;
            }
        }
    }
}
@media (max-width: 960px) {
    .btn
    {
        font-size: 14px;
        padding: 16px 32px;
        column-gap: 10px;
        &-icon
        {
            padding: 24px;
        }
    }
}
@media (max-width: 600px) {
    .btn
    {
        font-size: 14px;
        line-height: 114%;
        padding: 24px 48px;
        width: 100%;
        white-space: nowrap;
        column-gap: 10px;
        &-icon
        {
            padding: 24px;
        }
    }
}
</style>