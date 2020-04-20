import { isPositiveInteger } from "~/utils/number_util";

let projectStore = {
  state: {
    projects: [],
    selected_id: 0,
    selected_name: "",
  },
  setProjects(projects) {
    this.state.projects = projects;
  },
  setSelectedId(projectId) {
    if (!isPositiveInteger(projectId)){
      return
    }
    this.state.selected_id = parseInt(projectId)

    this.state.projects.forEach((project) => {
      if (project.id === projectId) {
        this.state.selected_name = project.project_name
        return
      }
    })
  }
};

export default projectStore;
