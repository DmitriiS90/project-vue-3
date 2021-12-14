<template>
  <div class="list">
    <p>{{ this.name }}</p>

    <div class="list-form">
      <div>
        <Field className="input" v-model.value="cardName" />
      </div>
      <div>
        <Button
          value="Add Card"
          appearance="primary"
          @click="createCard(this.listId)"
        />
      </div>
    </div>

    <div v-if="!!this.cards.length" class="list-cards">
      <Container @drop="onDrop">
        <Draggable
          v-for="card in this.cards"
          :key="card.id"
          class="list-cards-item"
        >
          <Card
            :name="card.name"
            :cardId="card.id"
            @deleteCard="deleteCard(card.id)"
          />
        </Draggable>
      </Container>
    </div>
    <p v-else>NO CARDS</p>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Field from "./Field.vue";
import Card from "./Card.vue";
import { Container, Draggable } from "vue3-smooth-dnd/dist/vue3-smooth-dnd.js";
export default {
  components: { Button, Field, Card, Container, Draggable },
  data() {
    return {
      cardName: "",
      cards: [],
      showDescription: null,
      apiKey: "dc599fe2c56f5a3c881cc6c67bbd95af",
      apiToken:
        "6a8b79d7762879acb352ad2b3f0715fd4f53e1710aa6ef9cbdaee0adeb1de3e5",
    };
  },
  created() {
    this.fetchCards();
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    listId: {
      type: String,
    },
  },
  methods: {
    async fetchCards() {
      const response = await fetch(
        `https://api.trello.com/1/lists/${this.listId}/cards/?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "GET",
        }
      );
      const cards = await response.json();
      // debugger;
      this.cards = cards;
    },
    async createCard(listId) {
      // const idList = "61b30dc848920d0f13349430";
      await fetch(
        `https://api.trello.com/1/cards?idList=${listId}&key=${this.apiKey}&token=${this.apiToken}&name=${this.cardName}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          this.fetchCards();
          console.log(`Response: ${response.status} ${response.statusText}`);
          return response.text();
        })
        .then((text) => console.log(text));
    },
    async deleteCard(cardId) {
      await fetch(
        `https://api.trello.com/1/cards/${cardId}?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          this.fetchCards();
          console.log(`Response: ${response.status} ${response.statusText}`);
          return response.text();
        })
        .then((text) => console.log(text));
    },
    onDrop(dropResult) {
      this.cards = this.applyDrag(this.cards, dropResult);
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
.list {
  width: 450px;
  cursor: pointer;
  border: brown 1px solid;
  border-radius: 10px;
  padding: 15px 50px;
  margin: 10px;
  &-cards {
    padding: 10px;
    &-item {
      display: flex;
      align-items: center;
      padding: 2px 0;
      border-bottom: rgb(179, 173, 173) 1px solid;
      &:hover {
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
      }
      p {
        flex: 1;
      }
    }
  }
}
</style>
