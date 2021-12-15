const projectModule = {
  state: {
    projects: [],
    project: null,
  },
  mutations: {
    setProject(state, project) {
      state.project = project;
    },
    fetchProjects(state, projects) {
      state.projects = projects;
    },
  },
  actions: {
    setProject({ commit }, project) {
      commit("setProject", project);
    },
    fetchProjects({ commit }, projects) {
      commit("fetchProjects", projects);
    },
  },
  getters: {
    getProjects(state) {
      return state.projects;
    },
    getCurrentProject(state) {
      return state.project;
    },
  },
};

export default projectModule;
