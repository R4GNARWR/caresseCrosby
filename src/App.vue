

<template>
  <main :style="{ paddingTop: mainOffsetTop + 'px' }" ref="wrapper">
    <TheHeader @update-offset-top="updateOffsetTop"></TheHeader>
    <router-view />
    <Widget></Widget>
    <ModalAuth id="loginForm"></ModalAuth>
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
import Widget from "./components/UI/Widget.vue";
import ModalAuth from "./components/modals/ModalAuth.vue";

export default {
  components: {
    TheFooter,
    TheHeader,
    SnackMessage,
    Widget,
    ModalAuth
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
      options: {
        Toolbar: {
          display: {
            left: ["infobar"],
            middle: [],
            right: [],
          },
        },
        Thumbs: false,
      }
    };
  },
  setup(){
  },
  mounted() {
    Fancybox.bind(this.$refs.wrapper, '[data-fancybox]', {
      ...(this.options || {}),
      closeButton: false,
    });
  },
  
  updated() {
    Fancybox.unbind(this.$refs.wrapper);
    Fancybox.bind(this.$refs.wrapper, '[data-fancybox]', {
      ...(this.options || {}),
      closeButton: false,
    });
  },
  unmounted() {
    Fancybox.destroy();
  },
}

</script>

<style lang="scss"> 

</style>
