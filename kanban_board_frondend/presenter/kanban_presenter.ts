import KanbanRepository from "../repository/kanban_repository";
import container from "../injection.config";

export default class KanbanPresenter {
  readonly repository: KanbanRepository;

  constructor() {
    this.repository = container.resolve("KanbanRepository");
  }

  read(): any {
    return this.repository.read();
  }
}
