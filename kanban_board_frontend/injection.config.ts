import { container } from "tsyringe";
import {
  BacklogRepositoryImpl,
  BacklogRepositoryMock
} from "./repository/backlog_repository";
import {
  ProjectRepositoryImpl,
  ProjectRepositoryMock
} from "./repository/project_repository";
import {
  SprintRepositoryImpl,
  SprintRepositoryMock
} from "./repository/sprint_repository";

container.register("BacklogRepository", { useClass: BacklogRepositoryImpl });
container.register("ProjectRepository", { useClass: ProjectRepositoryImpl });
container.register("SprintRepository", { useClass: SprintRepositoryImpl });

// Mock
// container.register("BacklogRepository", { useClass: BacklogRepositoryMock });
// container.register("ProjectRepository", { useClass: ProjectRepositoryMock });
// container.register("SprintRepository", { useClass: SprintRepositoryMock });

export default container;
