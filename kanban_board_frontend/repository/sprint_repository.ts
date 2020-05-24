import { injectable } from "tsyringe";
import axios from "axios";

export default interface SprintRepository {
  read(projectId: number): Promise<Array<JSON>>;
  find(id: number): Promise<JSON>;
  create(sprintName: string, projectId: number): Promise<boolean>;
  update(id: number, sprintName: string): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  closeSprint(projectId: number): Promise<boolean>;
  activateSprint(sprintId: number): Promise<boolean>;
}

@injectable()
export class SprintRepositoryImpl implements SprintRepository {
  async read(projectId: number): Promise<Array<JSON>> {
    let result = await axios.get("/api/sprint", {
      params: {
        project_id: projectId
      }
    });
    return result.data;
  }

  async find(id: number): Promise<JSON> {
    let result = await axios.get(`/api/sprint/${id}`);
    return result.data;
  }

  async create(sprintName: string, projectId: number): Promise<boolean> {
    await axios.post("/api/sprint/", {
      name: sprintName,
      project_id: projectId
    });
    return true;
  }

  async update(id: number, sprintName: string): Promise<boolean> {
    await axios.put(`/api/sprint/${id}/`, {
      name: sprintName
    });
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await axios.delete(`/api/sprint/${id}/`);
    return true;
  }

  async closeSprint(projectId: number): Promise<boolean> {
    await axios.put(`/api/sprint/close/`, {
      project_id: projectId
    });
    return true;
  }

  async activateSprint(sprintId: number): Promise<boolean> {
    await axios.put(`/api/sprint/${sprintId}/activate/`);
    return true;
  }
}

@injectable()
export class SprintRepositoryMock implements SprintRepository {
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

  find(id: number): any {
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

  async closeSprint(projectId: number) {
    return true;
  }

  async activateSprint(sprintId: number) {
    return true;
  }
}
