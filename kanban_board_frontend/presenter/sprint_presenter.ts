import SprintRepository from "../repository/sprint_repository";
import container from "../injection.config";

export default class SprintPresenter {
  readonly repository: SprintRepository;

  constructor() {
    this.repository = container.resolve("SprintRepository");
  }

  async read(projectId: number): Promise<Array<JSON>> {
    return this.repository.read(projectId);
  }

  async find(projectId: number): Promise<JSON> {
    return this.repository.find(projectId);
  }

  async create(sprintName: string, projectId: number): Promise<boolean> {
    return this.repository.create(sprintName, projectId);
  }

  async update(id: number, sprintName: string): Promise<boolean> {
    return this.repository.update(id, sprintName);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

  async closeSprint(projectId: number): Promise<boolean> {
    return this.repository.closeSprint(projectId);
  }

  async activateSprint(sprintId: number): Promise<boolean> {
    return this.repository.activateSprint(sprintId);
  }
}
