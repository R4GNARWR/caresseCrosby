<template>
    <div class="widget" @click="toggleWidget" >
        <img class="widget-img" src="/svg/widget.svg" :class="{'active': !widgetActive}">
        <img class="widget-close" src="/svg/widget-close.svg" :class="{'active': widgetActive}">
        <div class="widget-list" v-if="widgetActive"  v-click-outside="() => {widgetActive = !widgetActive}">
            <a class="widget-list__item" href="https://t.me/+79177471561">
                <img src="/svg/widget-telegram.svg">
            </a>
            <a class="widget-list__item" href="https://wa.me/79177471561?text=Здравствуйте%20у%20меня%20вопрос:">
                <img src="/svg/widget-whatsapp.svg">
            </a>
        </div>
    </div>
</template>
<script>
import vClickOutside from "click-outside-vue3"
export default {
    data() {
        return {
            widgetActive: false,
        }
    },
    directives: {
      clickOutside: vClickOutside.directive
    },
    methods: {
        toggleWidget() {
            this.widgetActive = !this.widgetActive
        }
    }
}
</script>
<style lang="scss">
    .widget
    {
        cursor: pointer;
        position: fixed;
        right: 7.2rem;
        bottom: 1.6rem;
        width: 6rem;
        height: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 900;
        background-color: #867B6E;
        border-radius: 50%;
    }
    .widget-img
    {
        display: none;
        width: 2.4rem;
        height: 2.4rem;
        object-fit: contain;
        &.active
        {
            display: block;
        }
    }
    .widget-close
    {
        display: none;
        width: 1.6rem;
        height: 1.6rem;
        object-fit: contain;
        &.active
        {
            display: block;
        }
    }
    .widget-list
    {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        position: absolute;
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);
    }
    .widget-list__item
    {
        width: 4.4rem;
        height: 4.4rem;
        img
        {
            width: 100%;
            height: 100%;
        }
    }
</style>