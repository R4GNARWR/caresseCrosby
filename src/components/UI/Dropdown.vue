<template>
    <div class="dropdown" ref="dropdown">
      <div class="dropdown__head" @click="toggleShow">
        <slot></slot>
        <img class="dropdown__head-arrow" src="/svg/arrow-black.svg" alt="">
      </div>
      <ul class="dropdown__body show" v-if="listShow">
        <li v-for="(item, index) in listItems" :key="index">
          <router-link :to="item.link" v-if="item.link">{{item.name}}</router-link>
          <button v-else @click="clickItem(item.name, item.value)">{{item.name}}</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  
  export default {
    props: {
      listItems: {
        type: [Array, Object],
        required: true
      },
    },
    setup(props, { emit }) {
      const listShow = ref(false)
      const dropdown = ref(null)
  
      const clickItem = (name, value) => {
        listShow.value = false
        emit('items-action', name, value)
      }
  
      const toggleShow = () => {
        listShow.value = !listShow.value
        console.log(listShow.value)
      }
  
      onMounted(() => {
        onClickOutside(dropdown, () => {
          if (listShow.value) {
            listShow.value = false
          }
        })
      })
  
      watch(() => props.listItems, () => {
        listShow.value = false
      })
  
      return { listShow, dropdown, clickItem, toggleShow }
    }
  }
  </script>
  


<style lang="scss">
.dropdown
{
    position: relative;
    &.no-arrow
    {
        .dropdown__head-arrow
        {
            display: none;
        }
    }
    &__head
    {
        display: flex;
        align-items: center;
        column-gap: .8rem;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
        cursor: pointer;
        &-arrow
        {
            width: 2rem;
            height: 2rem;
            object-fit: contain;
            pointer-events: none;
        }
    }
}
.dropdown__body
{
    padding: 1rem 1.6rem;
    display: none;
    background-color: #FFF;
    position: absolute;
    left: 0;
    top: calc(100% + 8px);
    width: 100%;
    min-width: 23.4rem;
    list-style: none;
    box-shadow: 0px 0px 4px 4px rgba(63, 36, 5, 0.04);
    z-index: 200;
    &.show
    {
        display: block;
    }
    li
    {
        a
        {
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: inherit;
            cursor: pointer;
        }
        margin-bottom: 1.2rem;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1em;
    }
}
@media (max-width:960px) {
    .dropdown
    {
        &__head
        {
            column-gap: 8px;
            font-size: 16px;
            &-arrow
            {
                width: 20px;
                height: 20px;
            }
        }
    }
    .dropdown__body
    {
        padding: 0 16px;
        width: 100%;
        min-width: 200px;
        box-shadow: none;
        li
        {
            margin-bottom: 16px;
            font-size: 16px;
            line-height: 1.5em;
        }
    }
}
</style>