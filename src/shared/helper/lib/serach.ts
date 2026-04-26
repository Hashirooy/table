
import type {TableData } from "../../ui/Table/type";


/// функцтя не должна принимать 2 разных типа данных


export const filteredFunc = (arr: TableData[], search: string) => {
  const q = search.toLowerCase();
  if (!search) {
    return arr;
  }

  return arr.filter((item: TableData) => {
  return (
    item.properties?.name?.toLowerCase().includes(q) ||
    item.properties?.status?.toLowerCase().includes(q)
  );
});
};
