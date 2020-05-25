import BacklogRepository from "../repository/backlog_repository";
import container from "../injection.config";

export default class BacklogPresenter {
  readonly repository: BacklogRepository;

  constructor() {
    this.repository = container.resolve("BacklogRepository");
  }

  async readActiveSprint(projectId: number): Promise<Array<JSON>> {
    return this.repository.readActiveSprint(projectId);
  }

  async read(sprintId: number, projectId: number): Promise<Array<JSON>> {
    return this.repository.read(sprintId, projectId);
  }

  async find(ticketId: number): Promise<JSON> {
    return this.repository.find(ticketId);
  }

  async create(ticket: JSON) {
    return this.repository.create(ticket);
  }

  async update(id: number, ticket: JSON): Promise<boolean> {
    return this.repository.update(id, ticket);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
