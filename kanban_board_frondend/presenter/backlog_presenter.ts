import BacklogRepository from "../repository/backlog_repository";
import container from "../injection.config";

export default class BacklogPresenter {
  readonly repository: BacklogRepository;

  constructor() {
    this.repository = container.resolve("BacklogRepository");
  }

  readActiveSprint(projectId: number): any {
    return this.repository.readActiveSprint(projectId);
  }

  async find(ticketId: number) {
    return this.repository.find(ticketId);
  }
}
