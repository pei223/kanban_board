import SprintRepository from "../repository/sprint_repository";
import container from "../injection.config";

export default class SprintPresenter {
  readonly repository: SprintRepository;

  constructor() {
    this.repository = container.resolve("SprintRepository");
  }

  async read() {
    return this.repository.read();
  }

  async find(projectId: number) {
    return this.repository.find(projectId);
  }

  async create(sprintName: string, projectId: number): Promise<boolean> {
    return this.repository.create(sprintName, projectId);
  }

  async update(id: number, sprintName: string): Promise<boolean> {
    return this.repository.update(id, sprintName);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
