import { injectable } from "tsyringe";
import axios from "axios";

export default interface ProjectRepository {
  read(): Promise<Array<JSON>>;
  find(id: number): Promise<JSON>;
  create(projectName: string): Promise<boolean>;
  update(id: number, projectName: string): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}

@injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  async read(): Promise<Array<JSON>> {
    let result = await axios.get("/api/project/");
    return result.data;
  }

  async find(id: number): Promise<JSON> {
    let result = await axios.get(`/api/project/${id}`);
    return result.data;
  }

  async create(projectName: string): Promise<boolean> {
    await axios.post("/api/project/", {
      project_name: projectName
    });
    return true;
  }

  async update(id: number, projectName: string): Promise<boolean> {
    await axios.put(`/api/project/${id}/`, {
      project_name: projectName
    });
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await axios.delete(`/api/project/${id}`);
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
  async read() {
    return this.data;
  }

  async find(id: number) {
    let findedData = this.data.filter(row => {
      return id === row.id;
    });
    if (findedData.length > 0) {
      return findedData[0];
    }
    return null;
  }

  async create(projectName: string) {
    this.data.push({ id: 3, project_name: projectName });
    return true;
  }

  async update(id: number, projectName: string) {
    this.data[id] = { id: id, project_name: projectName };
    return true;
  }

  async delete(id: number) {
    this.data.forEach((elem, i) => {
      if (elem.id === id) {
        this.data.splice(id, 1);
      }
    });
    return true;
  }
}
