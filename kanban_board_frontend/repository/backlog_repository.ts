import { injectable } from "tsyringe";
import axios from "axios";

export default interface BacklogRepository {
  readActiveSprint(projectId: number): any;
  read(sprintId: number, projectId: number): any;
  find(ticketId: number): any;
}

@injectable()
export class BacklogRepositoryImpl implements BacklogRepository {
  async readActiveSprint(projectId: number) {
    let result = await axios.get("/api/ticket/active_sprint", {
      params: {
        project_id: projectId
      }
    });
    return result.data;
  }

  async read(sprintId: number, projectId: number) {
    let result = await axios.get("/api/ticket", {
      params: {
        project_id: projectId,
        sprint_id: sprintId
      }
    });
    return result.data;
  }

  async find(ticketId: number) {
    let result = await axios.get(`/api/ticket/${ticketId}`);
    return result.data;
  }
}

@injectable()
export class BacklogRepositoryMock implements BacklogRepository {
  data: Array<any>;
  constructor() {
    this.data = [
      { id: 1, title: "hoge", point: 12 },
      { id: 2, title: "test", point: 12 }
    ];
  }

  async readActiveSprint(projectId: number) {
    return this.data;
  }

  async read(sprintId: number, projectId: number) {
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
}
