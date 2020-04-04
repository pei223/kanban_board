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
}
