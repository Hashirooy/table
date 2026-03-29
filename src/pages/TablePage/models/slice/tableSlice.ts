import { createSlice } from "@reduxjs/toolkit/react";
import type { TableSchema } from "../types/tableSchema";
import type { User } from "../../../../entities/User/model/types/UserSchema";
import { fetchAllUsers } from "../services/fechAllUsers";

const initialState: TableSchema = {
    users: [],
    isLoading: false,
    error: undefined,
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
            state.error = undefined;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        });
    },
});

export const { actions: tableActions } = tableSlice;
export const { reducer: tableReducer } = tableSlice;
