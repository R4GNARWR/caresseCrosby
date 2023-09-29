

<template>
  <main :style="{ paddingTop: mainOffsetTop + 'px' }" >
    <TheHeader @update-offset-top="updateOffsetTop"></TheHeader>
    <router-view />
    <TheFooter></TheFooter>
  </main>
</template>

<script>

import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

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
  methods: {
    updateOffsetTop(height) {
      this.mainOffsetTop = height;
    },
  },
  
}

</script>

<style lang="scss"> 
  
</style>
