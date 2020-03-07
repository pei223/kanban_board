import KanbanRepository from "../repository/kanban_repository";
import container from "../injection.config";

export default class KanbanDetailPresenter {
  readonly repository: KanbanRepository;

  constructor() {
    this.repository = container.resolve("KanbanRepository");
  }

  findDetail(id: number): any {
    return this.repository.findDetail(id);
  }
}
