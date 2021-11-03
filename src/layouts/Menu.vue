<template>
  <div class="menu">
    <div
      class="menu-button"
      v-bind:class="{ open: showMenu }"
      v-on:click="toggleShowMenu"
    >
      <MenuButton />
    </div>

    <transition name="animate">
      <div class="menu-items" v-if="showMenu">
        <NestedList
          value="Spaces"
          :items="[
            { value: 'Home', route: '/' },
            { value: 'About', route: '/about' },
            { value: 'Profile', route: '/profile' },
          ]"
        />
        <NestedList value="Posts" />
        <NestedList value="Settings" />
      </div>
    </transition>
  </div>
</template>

<script>
import NestedList from "../components/NestedList.vue";
import MenuButton from "../components/MenuButton.vue";
export default {
  components: { NestedList, MenuButton },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleShowMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  background: white;
  padding: 0 20px;
  &-button {
    width: fit-content;
    cursor: pointer;
    padding: 5px 0;
  }

  &-items {
    width: 100%;
  }

  .open {
    transform: rotate(180deg);
  }
}
.animate {
  &-enter-active {
    transition: all 0.5s ease-out;
  }

  &-leave-active {
    transition: all 0.2s;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }
}
</style>
