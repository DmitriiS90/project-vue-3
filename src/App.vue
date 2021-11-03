<template>
  <layout>
    <router-view />
  </layout>
  <!-- <component :is="layout">
    <router-view />
  </component> -->
</template>

<script>
import Layout from "./layouts/Layout.vue";

export default {
  components: {
    Layout,
  },
  // methods: {
  //   layout() {
  //     // const layoutName = this.$route.meta.layout || "DefaultLayout";
  //     if (this.$route.meta.layout) {
  //       return () => import("./layouts/Layout.vue");
  //     }
  //   },
  // },
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
