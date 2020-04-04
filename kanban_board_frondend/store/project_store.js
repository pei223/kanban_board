let projectStore = {
  state: {
    projects: [],
  },
  setProjects(projects) {
    this.state.projects = projects;
  },
};

export default projectStore;
