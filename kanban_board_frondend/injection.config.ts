import { container } from "tsyringe";
import {
  KanbanRepositoryImpl,
  KanbanRepositoryMock
} from "./repository/kanban_repository";

// container.register("KanbanRepository", { useClass: KanbanRepositoryImpl });
container.register("KanbanRepository", { useClass: KanbanRepositoryMock });

export default container;
