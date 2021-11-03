<template>
  <header>
    <div class="icon">ICON</div>

    <div class="header-search">
      <Search />
      <Avatar src="/images/user.png" appearance="circle" />
    </div>
  </header>
</template>

<script>
import Avatar from "../components/Avatar.vue";
import Search from "../components/Search.vue";
export default {
  components: { Avatar, Search },
};
</script>

<style lang="scss" scoped>
header {
  background-color: white;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 50px;
  .icon {
    padding: 0 50px;
  }
  .header-search {
    width: 28%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ul {
    list-style: none;
    margin: 0;
    color: white;
  }

  li {
    color: rgb(116, 114, 114);
    display: inline;
    margin: 0 5px;
  }

  .link {
    color: rgb(116, 114, 114);
    text-decoration: none;
  }
}
</style>
