<template>
  <input
    v-bind:name="this.name"
    v-bind:type="this.type"
    v-bind:placeholder="this.placeholder"
    v-bind:class="this.className"
    v-model="value"
  />
</template>

<script>
export default {
  data: () => ({
    value: "",
  }),
  props: {
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 188px;
  margin-top: 25px;
  padding: 15px 25px;
  font-weight: 400;
  font-size: 14px;
  color: #9d9e9e;
  text-shadow: 1px 1px 0 rgb(255, 255, 255);
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  &:hover {
    background: #dfe9ec;
    color: #414848;
  }
}
</style>
