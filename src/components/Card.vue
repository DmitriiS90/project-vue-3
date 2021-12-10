<template>
  <div class="card">
    <p>Card: {{ this.name }}</p>

    <div class="card-form">
      <div>
        <Field className="input" v-model.value="listItem" />
      </div>
      <div>
        <Button
          value="Add ITEM"
          appearance="primary"
          @click="addListItem(this.cardId)"
        />
      </div>
    </div>

    <div v-if="!!boardList.length" class="card-list">
      <div v-for="item in boardList" :key="item.id" class="card-list-item">
        <p @click="openDescription(item.id)">{{ item.listItem }}</p>

        <div v-if="showDescription == item.id">
          <Description
            :name="item.listItem"
            :cardId="this.cardId"
            :itemId="item.id"
            @closeDescription="closeDescription"
          />
        </div>
      </div>
    </div>
    <p v-else>NO ITEMS</p>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Field from "./Field.vue";
import Description from "./Description.vue";
export default {
  components: { Button, Field, Description },
  data() {
    return {
      listItem: "",
      boardList: [],
      showDescription: null,
    };
  },
  created() {
    fetch(`/api/projects/${this.$route.params.id}/boards`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          data = [];
        }
        this.boardList = data[this.cardId].list;
      });
  },
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
    async fetchBoardList() {
      const response = await fetch(
        `/api/projects/${this.$route.params.id}/boards`,
        {
          method: "GET",
        }
      );

      const boards = await response.json();
      this.boardList = boards[this.cardId].list;
    },
    async addListItem(cardId) {
      const { status } = await fetch(
        `/api/projects/${this.$route.params.id}/board`,
        {
          method: "POST",
          body: JSON.stringify({ cardId, listItem: this.listItem }),
        }
      );

      if (status === 201) {
        this.fetchBoardList(cardId);
      }
    },
    openDescription(itemId) {
      this.showDescription = itemId;
    },
    closeDescription() {
      this.showDescription = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 250px;
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
