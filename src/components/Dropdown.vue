<template>
  <div class="drop-menu">
    <div class="control" v-on:click="toggleShowMenu">
      <button class="button">{{ this.value }}</button>
      <svg
        v-bind:class="{ arrow: showMenu }"
        width="50"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0002 19.9996C15.8248 20.0006 15.6508 19.967 15.4884 19.9006C15.3259 19.8343 15.1782 19.7365 15.0536 19.6129L9.72025 14.2796C9.46918 14.0285 9.32812 13.688 9.32812 13.3329C9.32812 12.9779 9.46918 12.6373 9.72025 12.3863C9.97132 12.1352 10.3118 11.9941 10.6669 11.9941C11.022 11.9941 11.3625 12.1352 11.6136 12.3863L16.0002 16.7863L20.3869 12.3996C20.642 12.1812 20.9701 12.067 21.3057 12.08C21.6412 12.0929 21.9595 12.2321 22.197 12.4695C22.4345 12.707 22.5736 13.0253 22.5865 13.3609C22.5995 13.6964 22.4853 14.0245 22.2669 14.2796L16.9336 19.6129C16.6852 19.8593 16.35 19.9981 16.0002 19.9996Z"
          fill="black"
        />
      </svg>
    </div>

    <transition name="animate">
      <div class="menu" v-if="showMenu">
        <div class="menu-item" v-for="item in items" v-bind:key="item">
          {{ item }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  props: {
    items: {
      type: Array,
      default: null,
    },
    value: {
      type: String,
      default: "",
    },
    avatar: {
      default: null,
    },
  },
  methods: {
    toggleShowMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss/";
.drop-menu {
  height: 55px;
  border-radius: 8px;
  background: $list;
  color: $list-color;
  border: $list-menu-border;

  .control {
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      background: $control-color;
    }
  }

  .button {
    border: none;
    font-size: inherit;
    background: none;
    outline: none;
    display: flex;
    align-items: center;
    padding: 20px 70px 20px 20px;
    color: $list-button-color;
    font-weight: 600;
    line-height: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .arrow {
    transform: rotate(180deg);
  }

  .menu {
    position: relative;
    margin-top: 10px;
    width: 80%;
    border-radius: 8px;
    border: $list-menu-border;
  }

  .menu-item {
    padding: 10px 0;
    width: 100%;
    &:hover {
      background: $list-menu;
      border-radius: 4px;
    }
  }
}

.animate {
  &-enter-active {
    transition: all 0.3s ease-out;
  }

  &-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
}
</style>
