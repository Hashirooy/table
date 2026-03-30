import type { User } from "../../../../entities/User/model/types/userSchema";

export interface TableSchema {
    users: User[];
    isLoading?: boolean;
    error?: string;
}