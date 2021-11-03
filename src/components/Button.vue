<template>
  <button
    class="button"
    v-bind:class="this.classes"
    v-bind:disabled="this.isDisabled"
  >
    <span v-if="iconBefore">
      {{ this.iconBefore }}
    </span>
    <span>
      {{ this.value }}
    </span>
    <span v-if="iconAfter">
      {{ this.iconAfter }}
    </span>
  </button>
</template>

<script>
export default {
  computed: {
    classes() {
      return `button--${this.appearance}`;
    },
  },
  props: {
    appearance: {
      type: String,
      default: "primary",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    iconBefore: {
      default: null,
    },
    iconAfter: {
      default: null,
    },
    value: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss/";

.button {
  display: inline-flex;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 3px;
  font-size: inherit;
  font-weight: 600;
  line-height: 2.28571rem;
  padding: 0px 10px;

  span {
    flex-grow: 1;
    margin: 0 3px;
  }

  &:disabled {
    cursor: not-allowed;
    background: $disabled;
    color: $disabled-color;
    &:hover {
      background: $disabled;
      text-decoration: none;
    }
  }

  &--primary {
    background: $primary;
    color: $primary-color;
    &:hover {
      background: $primary-hover;
    }
  }

  &--warning {
    background: $warning;
    color: $warning-color;
    &:hover {
      background: $warning-hover;
    }
  }

  &--danger {
    background: $danger;
    color: $danger-color;
    &:hover {
      background: $danger-hover;
    }
  }

  &--subtle {
    background: none;
    color: $subtle-color;
    &:hover {
      background: $subtle-hover;
    }
  }

  &--link {
    background: none;
    color: $link-color;
    &:hover {
      text-decoration: underline;
    }
  }

  &--subtle-link {
    background: none;
    color: $subtle-link-color;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
