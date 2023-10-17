

<template>
  <main :style="{ paddingTop: mainOffsetTop + 'px' }" ref="wrapper">
    <TheHeader @update-offset-top="updateOffsetTop"></TheHeader>
    <router-view />
    <TheFooter></TheFooter>
    <SnackMessage
      v-if="snack_message && snack_message.message"
      :message="snack_message.message"
      :type="snack_message.type?snack_message.type:''"/>
  </main>
</template>

<script>
import {mapState} from "vuex"; 


import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import SnackMessage from './components/UI/SnackMessage.vue'
import { Fancybox } from "@fancyapps/ui";

export default {
  components: {
    TheFooter,
    TheHeader,
    SnackMessage
  },
  methods: {
    updateOffsetTop(height) {
      this.mainOffsetTop = height;
    },
  },
  computed: {...mapState(['loader', 'snack_message']),},
  data() {
    return {
      mainOffsetTop: 0,
    };
  },
  setup(){
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
