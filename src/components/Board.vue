<template>
  <div class="board">
    {{ this.name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  cursor: pointer;
  border: brown 1px solid;
  border-radius: 10px;
  padding: 15px 50px;
  margin: 10px;
  &:hover {
    background-color: #eb5b37;
  }
}
</style>
