import { injectable } from "tsyringe";
import axios from "axios";

export default interface ProjectRepository {
  read(): any;
  find(id: number): any;
  create(projectName: string): any;
  update(id: number, projectName: string): any;
}

@injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  async read() {
    let result = await axios.get("/api/project/");
    return result.data;
  }

  async find(id: number) {
    let result = await axios.get(`/api/project/${id}`);
    return result.data;
  }

  async create(projectName: string) {
    await axios.post("/api/project/", {
      project_name: projectName
    });
    return true;
  }

  async update(id: number, projectName: string) {
    await axios.put(`/api/project/${id}/`, {
      project_name: projectName
    });
    return true;
  }
}

@injectable()
export class ProjectRepositoryMock implements ProjectRepository {
  data: Array<any>;

  constructor() {
    this.data = [
      { id: 1, project_name: "Test Project" },
      { id: 2, project_name: "Test Project2" }
    ];
  }
  read() {
    return this.data;
  }

  find(id: number): any {
    let findedData = this.data.filter(row => {
      return id === row.id;
    });
    if (findedData.length > 0) {
      return findedData[0];
    }
    return null;
  }

  create(projectName: string) {
    this.data.push({ id: 3, project_name: projectName });
    return true;
  }

  update(id: number, projectName: string) {
    this.data[id] = { id: id, project_name: projectName };
    return true;
  }
}
