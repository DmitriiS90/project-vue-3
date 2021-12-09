<template>
  <div class="board">
    <p>Board: {{ this.name }}</p>

    <div class="board-form">
      <div>
        <Field className="input" v-model.value="listItem" />
      </div>
      <div>
        <Button
          value="Add ITEM"
          appearance="primary"
          @click="addListItem(this.boardId)"
        />
      </div>
    </div>

    <div v-if="!!boardList.length" class="board-list">
      <div v-for="item in boardList" :key="item.id" class="board-list-item">
        <p @click="openDescription(item.id)">{{ item.listItem }}</p>

        <div v-if="showDescription == item.id">
          <Description
            :name="item.listItem"
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
        this.boardList = data[this.boardId].list;
      });
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    boardId: {
      type: Number,
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
      this.boardList = boards[this.boardId].list;
    },
    async addListItem(boardId) {
      const { status } = await fetch(
        `/api/projects/${this.$route.params.id}/board`,
        {
          method: "POST",
          body: JSON.stringify({ boardId, listItem: this.listItem }),
        }
      );

      if (status === 201) {
        this.fetchBoardList(boardId);
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
.board {
  cursor: pointer;
  border: brown 1px solid;
  border-radius: 10px;
  padding: 15px 50px;
  margin: 10px;
  &-list {
    padding: 10px;
    &-item {
      padding: 2px 0;
      border-bottom: rgb(179, 173, 173) 1px solid;
      &:hover {
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
      }
    }
  }
}
</style>
