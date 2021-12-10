<template>
  <layout>
    <router-view />
  </layout>
</template>

<script>
import Layout from "./layouts/Layout.vue";

export default {
  components: {
    Layout,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
