import { createAsyncThunk } from "@reduxjs/toolkit/react";
import type { User } from "../../../../entities/User/model/types/userSchema";

export const fetchAllUsers = createAsyncThunk<User[], void>('table/fetchAllUsers', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch users');
    }
});