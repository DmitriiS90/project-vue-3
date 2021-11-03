<template>
  <div class="home">
    <Button value="home" appearance="primary" />
    <Button value="home" appearance="warning" />
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "Home",
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 10px;
}
</style>
