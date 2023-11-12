<template>
  <div class="snack" :class="type">{{message.msg}}</div>
</template>

<script>
export default {
  props:{
    message: String,
    type: String
  },
}
</script>

<style scoped>
.snack{
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 10000;
  min-width: 280px;
  bottom: 20px;
  font-size: 20px;
}
.error{
  background-color: darksalmon;
}
.success{
  background-color: lightgreen;
}
</style>
