<template>
    <div class="widget" @click.stop="toggleWidget" ref="widget">
        <img class="widget-img" src="/svg/widget.svg" :class="{ 'active': !widgetActive }">
        <img class="widget-close" src="/svg/widget-close.svg" :class="{ 'active': widgetActive }">
        <div class="widget-list" v-if="widgetActive">
            <a class="widget-list__item" href="https://t.me/+79177471561" target="_blank">
                <img src="/svg/widget-telegram.svg">
            </a>
            <a class="widget-list__item" href="https://wa.me/79177471561?text=Здравствуйте%20у%20меня%20вопрос:"
                target="_blank" @click="clickWhatsapp()">
                <img src="/svg/widget-whatsapp.svg">
            </a>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
    setup() {
        const widgetActive = ref(false)
        const widget = ref(null)

        const toggleWidget = () => {
            widgetActive.value = !widgetActive.value
        }
        const clickWhatsapp = () => {
            sendMetrika('click_whatsapp', 'reachGoal')
        }

        onMounted(() => {
            onClickOutside(widget, () => {
                widgetActive.value = false
            })
        })

        return { widgetActive, toggleWidget, widget }
    }
}
</script>

<style lang="scss">
.widget {
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

.widget-img {
    display: none;
    width: 2.4rem;
    height: 2.4rem;
    object-fit: contain;

    &.active {
        display: block;
    }
}

.widget-close {
    display: none;
    width: 1.6rem;
    height: 1.6rem;
    object-fit: contain;

    &.active {
        display: block;
    }
}

.widget-list {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
}

.widget-list__item {
    width: 4.4rem;
    height: 4.4rem;

    img {
        width: 100%;
        height: 100%;
    }
}

@media (max-width: 991px) {
    .widget {
        right: 20px;
        bottom: 20px;
        width: 60px;
        height: 60px;
    }

    .widget-img {
        width: 24px;
        height: 24px;
    }

    .widget-close {
        width: 16px;
        height: 16px;
    }

    .widget-list {
        row-gap: 10px;
    }

    .widget-list__item {
        width: 48px;
        height: 48px;
    }
}
</style>