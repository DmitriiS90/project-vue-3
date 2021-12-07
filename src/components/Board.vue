<template>
  <div class="board">
    <p>Board: {{ this.name }}</p>

    <div class="board-form">
      <div>
        <Field className="input" v-model.value="listItem" />
      </div>
      <div>
        <Button value="Add ITEM" appearance="primary" @click="addItem()" />
      </div>
    </div>

    <div v-if="!!boardList.length" class="board-list">
      <div v-for="item in boardList" :key="item.id" class="board-list-item">
        {{ item.listItem }}
      </div>
    </div>
    <p v-else>NO ITEMS</p>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Field from "../components/Field.vue";
export default {
  components: { Button, Field },
  data() {
    return {
      listItem: "",
    };
  },
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  computed: {
    boardList() {
      return this.$store.getters.getBoardList;
    },
  },
  methods: {
    addItem() {
      this.$store.dispatch("addBoardListItem", { listItem: this.listItem });
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  border: brown 1px solid;
  border-radius: 10px;
  padding: 15px 50px;
  margin: 10px;
  &-list {
    padding: 10px;
    &-item {
      padding: 2px 0;
      border-bottom: black 1px solid;
    }
  }
}
</style>
