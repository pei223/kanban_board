import projectStore from "../store/project_store";
import ProjectRepository from "../repository/project_repository";
import container from "../injection.config";

export default class ProjectPresenter {
  readonly repository: ProjectRepository;

  constructor() {
    this.repository = container.resolve("ProjectRepository");
  }

  async read() {
    let data = await this.repository.read();
    projectStore.setProjects(data);
  }

  async selectProject(projectId: number) {
    projectStore.setSelectedProjectId(projectId);
  }

  async find(projectId: number) {
    let projects = projectStore.state.projects.filter(project => {
      return project["id"] === projectId;
    });
    if (projects.length > 0) {
      return projects[0];
    }
    return this.repository.find(projectId);
  }

  async create(projectName: string): Promise<boolean> {
    return this.repository.create(projectName);
  }

  async update(id: number, projectName: string): Promise<boolean> {
    return this.repository.update(id, projectName);
  }
}
