import type { User } from "../../entities/User/model/types/userSchema";

// Переносим на уровень фичи (Таблица users)
export const filteredUsersFunc = (arr: User[], search: string) => {
  console.log(search);
  if (!search) {
    return arr;
  }
  const q = search.toLowerCase();
  return arr.filter((user) => {
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q)
    );
  });
};
