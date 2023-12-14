<template>
    <div class="searchModal" v-if="searchActive" v-click-outside="() => {this.$emit('toggleSearch')}">
        <Search @closeSearch="closeSearchModal"></Search>
    </div>
</template>
<script>

import Search from '../UI/Search.vue';

export default {
    components: { Search },
    emits: ['toggleSearch'],
    props: {
        searchActive: Boolean
    },
    methods: {
        closeSearchModal() {
            this.$emit('toggleSearch')
        }
    },
    
}
</script>
<style lang="scss">
.searchModal
{
    display: none;
}
@media (max-width: 960px) {
    .searchModal
    {
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: calc(100% + 10px);
        width: auto;
        display: flex;
        justify-content: center;
    }
}

</style>