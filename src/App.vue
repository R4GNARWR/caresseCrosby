

<template>
  <main :style="{ paddingTop: mainOffsetTop + 'px' }" ref="wrapper">
    <TheHeader @update-offset-top="updateOffsetTop"></TheHeader>
    <router-view />
    <TheFooter></TheFooter>
  </main>
</template>

<script>

import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import { Fancybox } from "@fancyapps/ui";

export default {
  components: {
    TheFooter,
    TheHeader
  },
  data() {
    return {
      mainOffsetTop: 0,
    };
  },
  setup(){
  },
  methods: {
    updateOffsetTop(height) {
      this.mainOffsetTop = height;
    },
  },
  mounted() {
    Fancybox.bind(this.$refs.wrapper, '[data-fancybox]', {
      ...(this.options || {}),
      closeButton: false,
      mainClass: 'modal-base__wrap',
    });
  },
  updated() {
    Fancybox.unbind(this.$refs.wrapper);
    Fancybox.close();
    
    Fancybox.bind(this.$refs.wrapper, '[data-fancybox]', {
      ...(this.options || {}),
      closeButton: false,
      mainClass: 'modal-base__wrap',
    });
  },
  unmounted() {
    Fancybox.destroy();
  },
}

</script>

<style lang="scss"> 

</style>
