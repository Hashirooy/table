import type { User } from "../../../../entities/User/model/types/UserSchema";

export interface TableSchema {
    users: User[];
    isLoading?: boolean;
    error?: string;
}