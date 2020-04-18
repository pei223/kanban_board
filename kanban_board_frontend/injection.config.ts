import { container } from "tsyringe";
import {
  BacklogRepositoryImpl,
  BacklogRepositoryMock
} from "./repository/backlog_repository";
import {
  ProjectRepositoryImpl,
  ProjectRepositoryMock
} from "./repository/project_repository";

container.register("BacklogRepository", { useClass: BacklogRepositoryImpl });
container.register("ProjectRepository", { useClass: ProjectRepositoryImpl });

// Mock
// container.register("BacklogRepository", { useClass: BacklogRepositoryMock });
// container.register("ProjectRepository", { useClass: ProjectRepositoryMock });

export default container;
