<template>
  <div class="board">
    <h1 v-if="board">Board: {{ this.board.name }}</h1>

    <div class="board-form">
      <div>
        <Field className="input" v-model.value="name" />
      </div>
      <div>
        <Button
          value="Create list"
          appearance="danger"
          @click="createCard(this.board.id)"
        />
      </div>
    </div>

    <div v-if="!!this.lists.length" class="board-cards">
      <div v-for="list in this.lists" :key="list.id">
        <List :name="list.name" :listId="list.id" />
      </div>
    </div>
    <p v-else>NO CARDS</p>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Field from "./Field.vue";
import List from "./List.vue";
export default {
  components: { Button, Field, List },
  data() {
    return {
      name: "",
      board: null,
      lists: [],
      apiKey: "dc599fe2c56f5a3c881cc6c67bbd95af",
      apiToken:
        "6a8b79d7762879acb352ad2b3f0715fd4f53e1710aa6ef9cbdaee0adeb1de3e5",
    };
  },
  created() {
    this.getCurrentBoard();
  },
  computed: {
    boards() {
      return this.$store.getters.getBoards;
    },
  },
  methods: {
    async getCurrentBoard() {
      const response = await fetch(
        `https://api.trello.com/1/boards/${this.$route.params.id}?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json; charset=utf-8",
            "Accept-Language": "ru-RU,ru;q=0.5",
            "Content-Type": "application/json",
          },
        }
      );
      const board = await response.json();
      this.board = { id: board.id, name: board.name };
      this.fetchLists(this.board.id);
    },
    async fetchLists(boardId) {
      const response = await fetch(
        `https://api.trello.com/1/boards/${boardId}/?key=${this.apiKey}&token=${this.apiToken}&fields=name&lists=all&list_fields=all`,
        {
          method: "GET",
        }
      );
      const board = await response.json();
      // debugger;
      this.lists = board.lists;
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  &-form {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    width: 25%;
    border: rgb(85, 81, 81) 2px solid;
    border-radius: 10px;
    padding: 30px;
  }
  &-cards {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
