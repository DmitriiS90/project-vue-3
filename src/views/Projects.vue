<template>
  <div class="projects">
    <h1>Projects</h1>

    <div class="projects-form">
      <div>
        <Field className="input" v-model.value="name" />
      </div>
      <div>
        <Button
          value="Create project"
          appearance="danger"
          @click="createProject"
        />
      </div>
    </div>
    <div class="projects-list" v-if="!!projects.length">
      <router-link
        v-for="project in projects"
        :key="project.id"
        v-on:click="getProjectById(project.id)"
        v-bind:to="{ name: 'Project', params: { id: project.id } }"
      >
        <p>
          Project: {{ project.name }}
          <!-- <Button
            value="X"
            appearance="subtle"
            @click.prevent="deleteProject(project.id)"
          /> -->
        </p>
      </router-link>
    </div>
    <p v-else>NO PROJECTS</p>
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
    };
  },
  computed: {
    projects() {
      return this.$store.getters.getProjects;
    },
  },
  methods: {
    async fetchProjects() {
      const response = await fetch("/api/projects", {
        method: "GET",
      });
      const projects = await response.json();
      this.$store.dispatch("fetchProjects", projects);
    },
    async createProject() {
      const { status } = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify({ name: this.name }),
      });

      if (status === 201) {
        this.fetchProjects();
      }
    },
    async getProjectById(id) {
      const response = await fetch(`/api/projects/${id}`, {
        method: "GET",
      });

      if (response.status === 200) {
        const project = await response.json();

        this.$store.dispatch("setProject", project);
      }
    },
    // async deleteProject(projectId) {
    //   const response = await fetch(`/api/projecty/${projectId}`, {
    //     method: "DELETE",
    //   });
    //   console.log(await response.json());
    //   this.fetchProjects();
    // },
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
