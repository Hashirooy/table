import type { StateSchema } from "../../../../app/providers/StoreProviders/config/StateSchema";

export const getTableUsers = (state: StateSchema) => state.table.users;
export const getTableIsLoading = (state: StateSchema) => state.table.isLoading;
export const getTableError = (state: StateSchema) => state.table.error;
