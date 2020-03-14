import { container } from "tsyringe";
import {
  KanbanRepositoryImpl,
  KanbanRepositoryMock
} from "./repository/kanban_repository";
import {
  ProjectRepositoryImpl,
  ProjectRepositoryMock
} from "./repository/project_repository";

// container.register("KanbanRepository", { useClass: KanbanRepositoryImpl });
// container.register("ProjectRepository", { useClass: ProjectRepositoryImpl });

// Mock
container.register("KanbanRepository", { useClass: KanbanRepositoryMock });
container.register("ProjectRepository", { useClass: ProjectRepositoryMock });

export default container;
