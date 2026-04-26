


export interface User {
  id?: string;
  properties?: {
    email?: string;
    password?: string;
    isActivated?: boolean;
    roles?: string[];
    name?: string;
    department?: string;
    date?: string;
    role?: string;
    status?: string;
  };
}

export interface TableSchema {
    users: User[];
    isLoading?: boolean;
    error?: string;
}