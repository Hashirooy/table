import type {SortColumn, TableData } from "../../ui/Table/type";


export const sortFunc = (
  arr: TableData[],
  column: string,
  sortColumn: SortColumn,
) => {
  const q = column.toString().toLowerCase();

  if (sortColumn === "asc") {
    return [...arr].sort((a: TableData, b: TableData) => {
      if (!a.properties || !b.properties || (a.properties as Record<string, string>)[q] === undefined || (b.properties as Record<string, string>)[q] === undefined) {
        return 0;
      }
      return ((a.properties as Record<string, string>)[q]).localeCompare(
        (b.properties as Record<string, string>)[q],
      );
    });
  } else {
    return [...arr].sort((a: TableData, b: TableData) => {
      if (!a.properties || !b.properties || (a.properties as Record<string, string>)[q] === undefined || (b.properties as Record<string, string>)[q] === undefined) {
        return 0;
      }
      return ((b.properties as Record<string, string>)[q]).localeCompare(
        (a.properties as Record<string, string>)[q],
      );
    });
  }
};
