import ProjectRepository from "../repository/project_repository";
import container from "../injection.config";

export default class KanbanDetailPresenter {
  readonly repository: ProjectRepository;

  constructor() {
    this.repository = container.resolve("ProjectRepository");
  }

  async read() {
    return await this.repository.read();
  }
}
