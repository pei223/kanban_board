import { injectable } from "tsyringe";

export default interface KanbanRepository {
  read(): any;
  findDetail(id: number): any;
}

@injectable()
export class KanbanRepositoryImpl {
  read() {
    return [
      { id: 1, title: "hoge", point: 12 },
      { id: 3, title: "hoge", point: 19 }
    ];
  }

  findDetail(id: number): any {
    return { title: "hoge" };
  }
}

@injectable()
export class KanbanRepositoryMock {
  data: Array<any>;
  constructor() {
    this.data = [
      { id: 1, title: "hoge", point: 12 },
      { id: 2, title: "test", point: 12 }
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
