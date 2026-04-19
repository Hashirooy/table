import type { User } from "../../../entities/User/model/types/userSchema";
import type { Order } from "../../ui/Table/type";

export const filteredByStatusFunc = (arr: User[] | Order[], status: string) => {
  if (status === "") {
    return arr;
  }
  return arr.filter((item: User | Order) => {
    return item.properties?.status === status;
  });
};
