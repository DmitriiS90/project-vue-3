<template>
  <NestedList
    value="Spaces"
    :items="[
      { value: 'Home', route: '/' },
      { value: 'Profile', route: '/profile' },
    ]"
  />
  <NestedList
    value="Projects"
    :items="[{ value: 'Boards', route: '/boards' }]"
  />
  <NestedList value="Settings" />
</template>

<script>
import NestedList from "./NestedList.vue";
export default {
  components: { NestedList },
};
</script>
