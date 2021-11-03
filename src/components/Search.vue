<template>
  <div class="search">
    <input type="text" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search {
  padding: 10px;
  input {
    width: 100%;
    border: black 1px solid;
    border-radius: 10px;
    background: url("./../../public/images/search.svg") no-repeat;
    background-position: left;
    padding: 10px 27px;
  }
}
</style>
