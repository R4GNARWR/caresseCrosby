

<template>
  <Metrika></Metrika>
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
  <v-dialog v-model="loader" width="300">
    <v-card color="#867B6E">
      <v-card-text style="color: white">
        Идет загрузка
        <v-progress-linear
            indeterminate="true"
            color="white"
            class="mb-0"
            background-opacity="0.01"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";
import { Fancybox } from "@fancyapps/ui";


import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import SnackMessage from './components/UI/SnackMessage.vue'
import Widget from "./components/UI/Widget.vue";
import ModalAuth from "./components/modals/ModalAuth.vue";
import Metrika from "./components/Metrika.vue";

export default {
  components: {
    TheFooter,
    TheHeader,
    SnackMessage,
    Widget,
    ModalAuth,
    Metrika
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
  methods: {
    updateOffsetTop(height) {
      this.mainOffsetTop = height;
    },
    setFancyboxCloseButton() {
      const isMobile = window.innerWidth < 960;
      const closeButtonValue = isMobile ? true : false;
      Fancybox.bind(this.$refs.wrapper, '[data-fancybox]', {
        ...(this.options || {}),
        closeButton: closeButtonValue,
      });
    },
  },
  mounted() {
    this.setFancyboxCloseButton();
    window.addEventListener('resize', this.setFancyboxCloseButton);
  },
  updated() {
    Fancybox.unbind(this.$refs.wrapper);
    this.setFancyboxCloseButton();
  },
  unmounted() {
    Fancybox.destroy();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setFancyboxCloseButton);
  },
}

</script>

<style lang="scss">
.fancybox__content > .f-button.is-close-btn
{
  right: 5% !important;
}
@media (max-width: 580px) {
  .is-compact .fancybox__content > .f-button.is-close-btn
  {
    top: -15px !important;
    right: 20px !important;
  }
}
</style>
