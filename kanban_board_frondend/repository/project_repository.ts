import { injectable } from "tsyringe";
import axios from "axios";

export default interface ProjectRepository {
  read(): any;
  findDetail(id: number): any;
}

@injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  async read() {
    try {
      let result = await axios.get("/api/project/");
      return result.data;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  findDetail(id: number): any {
    return null;
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

  findDetail(id: number): any {
    let findedData = this.data.filter(row => {
      return id === row.id;
    });
    if (findedData.length > 0) {
      return findedData[0];
    }
    return null;
  }
}
