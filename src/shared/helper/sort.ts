import type { Order, SortColumn } from "../ui/Table/type";

export const sortFunc = (arr: {}[], column: string, sortColumn: SortColumn) => {
  console.log(arr);
  const q = column.toString().toLowerCase();
  console.log(q);
  if (sortColumn === "asc") {
    return [...arr].sort((a: any, b: any) => {
      if (a.properties[q] === undefined || b.properties[q] === undefined) {
        return 0;
      }
      return (a.properties[q] as string).localeCompare(
        b.properties[q] as string,
      );
    });
  } else {
    return [...arr].sort((a: any, b: any) => {
      if (a.properties[q] === undefined || b.properties[q] === undefined) {
        return 0;
      }
      return (b.properties[q] as string).localeCompare(
        a.properties[q] as string,
      );
    });
  }
};
