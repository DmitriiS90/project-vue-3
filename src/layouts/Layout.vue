<template>
  <div v-bind:class="{ layout: $route.meta.layout }">
    <Header v-if="$route.meta.layout" />

    <section class="content">
      <Menu v-if="$route.meta.layout" />

      <div class="page">
        <slot />
      </div>
    </section>

    <Footer v-if="$route.meta.layout" />
  </div>
</template>

<script>
import Menu from "./Menu.vue";
import Footer from "./Footer.vue";
import Header from "./Header.vue";
export default {
  name: "Layout",
  components: { Header, Footer, Menu },
};
</script>

<style lang="scss" scoped>
.layout {
  .content {
    display: flex;
    min-height: calc(100vh - 140px);
    .page {
      width: 100%;
      border-radius: 8px;
      background: rgb(238, 236, 236);
      margin-right: 5px;
    }
  }
}
</style>
