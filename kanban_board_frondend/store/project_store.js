let projectStore = {
  state: {
    projects: [],
    selected_project_id: 0
  },
  setProjects(projects) {
    this.state.projects = projects;
  },
  setSelectedProjectId(projectId) {
    this.state.selected_project_id = projectId
  }
};

export default projectStore;
