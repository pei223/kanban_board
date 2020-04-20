import { injectable } from "tsyringe";
import axios from "axios";

export default interface SprintRepository {
  read(): any;
  find(id: number): any;
  create(sprintName: string, projectId: number): any;
  update(id: number, sprintName: string): any;
  delete(id: number): any;
}

@injectable()
export class SprintRepositoryImpl implements SprintRepository {
  async read() {
    let result = await axios.get("/api/sprint/");
    return result.data;
  }

  async find(id: number) {
    let result = await axios.get(`/api/sprint/${id}`);
    return result.data;
  }

  async create(sprintName: string, projectId: number) {
    await axios.post("/api/sprint/", {
      name: sprintName,
      project_id: projectId
    });
    return true;
  }

  async update(id: number, sprintName: string) {
    await axios.put(`/api/sprint/${id}/`, {
      name: sprintName
    });
    return true;
  }

  async delete(id: number) {
    await axios.delete(`/api/sprint/${id}`);
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

  delete(id: number) {
    this.data.forEach((elem, i) => {
      if (elem.id === id) {
        this.data.splice(id, 1);
      }
    });
  }
}
