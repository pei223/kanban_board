import BacklogRepository from "../repository/backlog_repository";
import container from "../injection.config";

export default class BacklogPresenter {
  readonly repository: BacklogRepository;

  constructor() {
    this.repository = container.resolve("BacklogRepository");
  }

  async readActiveSprint(projectId: number): any {
    return this.repository.readActiveSprint(projectId);
  }

  read(sprintId: number, projectId: number): any {
    return this.repository.read(sprintId, projectId);
  }

  async find(ticketId: number) {
    return this.repository.find(ticketId);
  }

  async update(id: number, ticket: JSON) {
    return this.repository.update(id, ticket);
  }
}
