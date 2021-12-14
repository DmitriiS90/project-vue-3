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
          @click="createList(this.board.id)"
        />
      </div>
    </div>

    <div v-if="!!this.lists.length" class="board-cards">
      <Container @drop="onDrop" class="board-cards-container">
        <Draggable v-for="list in this.lists" :key="list.id">
          <List :name="list.name" :listId="list.id" />
        </Draggable>
      </Container>
    </div>
    <p v-else>NO CARDS</p>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Field from "./Field.vue";
import List from "./List.vue";
import { Container, Draggable } from "vue3-smooth-dnd/dist/vue3-smooth-dnd.js";
export default {
  components: { Button, Field, List, Container, Draggable },
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
    async createList(boardId) {
      const response = await fetch(
        `https://api.trello.com/1/boards/${boardId}/lists/?key=${this.apiKey}&token=${this.apiToken}&name=${this.name}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          this.fetchLists(boardId);
          console.log(`Response: ${response.status} ${response.statusText}`);
          return response.text();
        })
        .then((text) => console.log(text))
        .catch((err) => console.error(err));
      const board = await response.json();
      // debugger;
      this.lists = board.lists;
    },
    onDrop(dropResult) {
      this.lists = this.applyDrag(this.lists, dropResult);
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
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
    &-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}
</style>
