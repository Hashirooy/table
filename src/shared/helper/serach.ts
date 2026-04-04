import type { User } from "../../entities/User/model/types/userSchema";




export const filteredFunc = (arr:{}[] , search: string) => {
  if (!search) {
    return arr;
  }
  const q = search.toLowerCase();
  return arr.filter((item: any) => {
    return (
      item.properties?.name.toLowerCase().includes(q) ||
      item.properties?.email.toLowerCase().includes(q)
    );
  });
};
