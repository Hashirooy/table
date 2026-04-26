import type { TableData } from "../../ui/Table/type";


export const filteredByStatusFunc = (arr: TableData[], status: string) => {
  if (status === "") {
    return arr;
  }
  return arr.filter((item: TableData) => {
    return item.properties?.status === status;
  });
};
