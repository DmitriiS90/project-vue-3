<template>
  <div class="avatar">
    <img
      class="img"
      v-on:click="toggleShowMenu"
      v-bind:class="this.classes"
      v-bind:src="this.src"
    />

    <div class="menu" v-if="showMenu">
      <div class="menu-item" v-on:click.prevent="getProfile">
        Profile settings
      </div>
      <div class="menu-item" v-on:click.prevent="getProfile">View profile</div>
      <div class="menu-item" v-on:click.prevent="logout">Log out</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    classes() {
      return `img--${this.appearance}`;
    },
  },
  methods: {
    toggleShowMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      this.$store.dispatch("setAuth", false);
      this.$router.push("/login");
    },
    getProfile() {
      this.$router.push("/profile");
    },
  },
  props: {
    src: {
      type: String,
      default: "/images/user2.png",
    },
    appearance: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss/";
.avatar {
  cursor: pointer;
  width: 55px;
  height: 55px;
  .img {
    width: 55px;
    height: 55px;

    &--circle {
      border-radius: 50px;
    }

    &--square {
      border-radius: 0;
    }
  }
  .menu {
    cursor: pointer;
    position: relative;
    right: 140px;
    margin-top: 10px;
    width: 200px;
    border-radius: 8px;
    border: $list-menu-border;
    background: white;
    &-item {
      padding: 10px 0;
      width: 100%;
      &:hover {
        background: $list-menu;
        border-radius: 4px;
      }
    }
  }
}
</style>
