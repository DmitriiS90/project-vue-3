<template>
  <div class="dashboard">
    <div
      class="dashboard-button"
      v-bind:class="{ open: showMenu }"
      v-on:click="toggleShowMenu"
    >
      <MenuButton />
    </div>

    <transition name="animate">
      <div class="dashboard-items" v-if="showMenu">
        <Menu />
      </div>
    </transition>
  </div>
</template>

<script>
import MenuButton from "../components/MenuButton.vue";
import Menu from "../components/Menu.vue";
export default {
  components: { MenuButton, Menu },
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
.dashboard {
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
