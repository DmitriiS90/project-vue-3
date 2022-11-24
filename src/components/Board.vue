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

    <div v-if="this.board" class="board-list">
      <Container
        class="board-list-container"
        group-name="lists"
        tag="div"
        orientation="horizontal"
        @drop="onListDrop($event)"
      >
        <Draggable
          class="board-list-container-dnd"
          v-for="list in this.board.lists"
          :key="list.id"
        >
          <p>{{ list.name }}</p>
          <div v-for="card in this.cards" :key="card.id">
            <Container
              v-if="card.idList === list.id"
              group-name="cards"
              :shouldAcceptDrop="(e, payload) => e.groupName === 'cards'"
              :get-child-payload="getCardPayload(list.id)"
              @drop="(e) => onCardDrop(list.id, e)"
            >
              <Draggable class="list-cards-item">
                <Card
                  :name="card.name"
                  :cardId="card.id"
                  @deleteCard="deleteCard(card.id)"
                />
              </Draggable>
            </Container>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Field from "./Field.vue";
// import List from "./List.vue";
import { Container, Draggable } from "vue3-smooth-dnd/dist/vue3-smooth-dnd.js";
import Card from "./Card.vue";
export default {
  components: { Button, Field, Container, Draggable, Card },
  data() {
    return {
      name: "",
      board: null,
      lists: [],
      cards: [],
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
        `https://api.trello.com/1/boards/${this.$route.params.id}?&lists=all&cards=open&key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json; charset=utf-8",
            "Accept-Language": "ru-RU,ru;q=0.5",
            "Content-Type": "application/json",
          },
        }
      );

      const boardData = await response.json();
      this.board = boardData;
      this.lists = boardData.lists;
      this.cards = boardData.cards;
      console.log(this.cards);
    },
    async fetchLists(boardId) {
      const response = await fetch(
        `https://api.trello.com/1/boards/${boardId}/?key=${this.apiKey}&token=${this.apiToken}&fields=name&lists=all&list_fields=all`,
        {
          method: "GET",
        }
      );
      const board = await response.json();
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
      this.lists = board.lists;
    },
    applyDrag(array, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return array;
      const result = [...array];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    },
    onListDrop(dropResult) {
      this.lists = this.applyDrag(this.lists, dropResult);
    },
    onCardDrop(listId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const cards = [...this.cards];
        const list = this.lists.filter((list) => list.id === listId)[0];
        const itemIndex = cards.indexOf(list);
        let newList = [...list];

        newList = this.applyDrag(newList, dropResult);
        cards.splice(itemIndex, 1, newList);
        this.cards = cards;
      }
    },
    getCardPayload(listId) {
      return (index) => {
        return this.cards.filter((card) => card.idList === listId)[0][index];
      };
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
  &-list {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    &-container {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      &-dnd {
        width: 450px;
        cursor: pointer;
        border: brown 1px solid;
        border-radius: 10px;
        padding: 15px 50px;
        margin: 10px;
      }
    }
  }
}
</style>
