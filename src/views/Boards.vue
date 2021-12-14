<template>
  <div class="projects">
    <h1>Boards</h1>

    <div class="projects-form">
      <div>
        <Field className="input" v-model.value="name" />
      </div>
      <div>
        <Button value="Create board" appearance="danger" @click="createBoard" />
      </div>
    </div>
    <div class="projects-list" v-if="!!boards.length">
      <router-link
        v-for="board in boards"
        :key="board.id"
        v-bind:to="{ name: 'Board', params: { id: board.id } }"
      >
        <p>Project: {{ board.name }}</p>
      </router-link>
    </div>
    <p v-else>NO BOARDS</p>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Field from "../components/Field.vue";
export default {
  components: { Button, Field },
  data() {
    return {
      name: "",
      boards: [],
      apiKey: "dc599fe2c56f5a3c881cc6c67bbd95af",
      apiToken:
        "6a8b79d7762879acb352ad2b3f0715fd4f53e1710aa6ef9cbdaee0adeb1de3e5",
    };
  },
  created() {
    this.fetchBoards();
  },
  computed: {
    projects() {
      return this.$store.getters.getProjects;
    },
  },
  methods: {
    async fetchBoards() {
      const response = await fetch(
        `https://api.trello.com/1/members/me/boards/?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json; charset=utf-8",
            "Accept-Language": "ru-RU,ru;q=0.5",
            "Content-Type": "application/json",
          },
        }
      );
      const boards = await response.json();
      this.boards = boards;
    },
    async createBoard() {
      await fetch(
        `https://api.trello.com/1/boards/?key=${this.apiKey}&token=${this.apiToken}&name=${this.name}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          this.fetchBoards();
          console.log(`Response: ${response.status} ${response.statusText}`);
          return response.text();
        })
        .then((text) => console.log(text))
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.projects {
  a {
    text-decoration: none;
    font-size: 25px;
    color: rgb(85, 81, 81);
  }
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
    p {
      cursor: pointer;
      border: rgb(85, 81, 81) 1px solid;
      border-radius: 10px;
      padding: 15px;
      margin: 15px;
    }
    p:hover {
      background-color: #d15232;
    }
  }
}
</style>
