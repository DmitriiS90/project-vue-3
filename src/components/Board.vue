<template>
  <div class="board">
    <h1 v-if="board">Board: {{ this.board.name }}</h1>

    <div class="board-form">
      <div>
        <Field className="input" v-model.value="name" />
      </div>
      <div>
        <Button
          value="Create board"
          appearance="danger"
          @click="createCard(this.board.id)"
        />
      </div>
    </div>

    <div v-if="!!this.cards.length" class="board-cards">
      <div v-for="card in this.cards" :key="card.id">
        <Card :name="card.name" :cardId="card.id" />
      </div>
    </div>
    <p v-else>NO CARDS</p>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Button from "./Button.vue";
import Field from "./Field.vue";
export default {
  components: { Card, Button, Field },
  data() {
    return {
      name: "",
      board: null,
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
      // debugger;
      const board = await response.json();
      this.board = { id: board.id, name: board.name };
      this.fetchCards(this.board.id);
    },
    async fetchCards(boardId) {
      const response = await fetch(
        `https://api.trello.com/1/boards/${boardId}/cards/?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "GET",
        }
      );
      const cards = await response.json();
      debugger;
      this.cards = cards;
    },
    async createCard() {
      await fetch(
        `https://api.trello.com/1/cards?idList=${this.board.id}?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          console.log(`Response: ${response.status} ${response.statusText}`);
          return response.text();
        })
        .then((text) => console.log(text));
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
