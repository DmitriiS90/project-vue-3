<template>
  <div class="project">
    <h1 v-if="project">Project: {{ project.name }}</h1>

    <div class="project-form">
      <div>
        <Field className="input" v-model.value="name" />
      </div>
      <div>
        <Button
          value="Create board"
          appearance="danger"
          @click="createBoard(project.id)"
        />
      </div>
    </div>

    <div v-if="!!boards.length" class="project-boards">
      <div v-for="board in boards" :key="board.id">
        <Board :name="board.name" />
      </div>
    </div>
    <p v-else>NO BOARDS</p>
  </div>
</template>

<script>
import Board from "./Board.vue";
import Button from "../components/Button.vue";
import Field from "../components/Field.vue";
export default {
  components: { Board, Button, Field },
  data() {
    return {
      name: "",
    };
  },
  created() {
    fetch(`/api/projects/${this.$route.params.id}/boards`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data) {
          data = [];
        }
        this.$store.dispatch("fetchBoards", data);
      });
  },
  computed: {
    project() {
      return this.$store.getters.getCurrentProject;
    },
    boards() {
      return this.$store.getters.getBoards;
    },
  },
  methods: {
    async fetchBoards(projectId) {
      const response = await fetch(`/api/projects/${projectId}/boards`, {
        method: "GET",
      });

      const boards = await response.json();
      // debugger;
      this.$store.dispatch("fetchBoards", boards);
    },
    async createBoard(projectId) {
      const { status } = await fetch(`/api/boards`, {
        method: "POST",
        body: JSON.stringify({ projectId, name: this.name }),
      });

      if (status === 201) {
        this.fetchBoards(projectId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.project {
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
  &-boards {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>
