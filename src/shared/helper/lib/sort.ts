import type { Order, SortColumn } from "../../ui/Table/type";
import type { User } from "../../../entities/User/model/types/userSchema";

export const sortFunc = (
  arr: User[] | Order[],
  column: string,
  sortColumn: SortColumn,
) => {
  const q = column.toString().toLowerCase();

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
