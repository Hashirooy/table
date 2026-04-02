import type { User } from "../../../../entities/User/model/types/userSchema";

// Если это схема общей таблицы, то это shared
export interface Table {
  users: User[];
  isLoading?: boolean;
  error?: string;
}
