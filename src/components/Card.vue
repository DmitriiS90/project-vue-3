<template>
  <div class="card" @click.prevent="openDescription(this.cardId)">
    <p>Card: {{ this.name }}</p>
    <Button value="X" appearance="warning" @click="$emit('deleteCard')" />
  </div>
  <div v-if="showDescription === this.cardId">
    <Description :cardName="this.name" @closeDescription="closeDescription" />
  </div>
</template>

<script>
import Button from "./Button.vue";
import Description from "./Description.vue";
export default {
  components: { Button, Description },
  data() {
    return {
      listItem: "",
      boardList: [],
      showDescription: null,
      apiKey: "dc599fe2c56f5a3c881cc6c67bbd95af",
      apiToken:
        "6a8b79d7762879acb352ad2b3f0715fd4f53e1710aa6ef9cbdaee0adeb1de3e5",
    };
  },
  created() {},
  emits: ["deleteCard"],
  props: {
    name: {
      type: String,
      default: "",
    },
    cardId: {
      type: String,
    },
  },
  methods: {
    openDescription(cardId) {
      this.showDescription = cardId;
    },
    closeDescription() {
      this.showDescription = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  cursor: pointer;
  border: brown 1px solid;
  border-radius: 10px;
  padding: 15px 50px;
  margin: 10px;
  &-list {
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
