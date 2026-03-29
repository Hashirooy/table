import { configureStore } from '@reduxjs/toolkit'
import type { StateSchema } from './StateSchema'
import { tableReducer } from '../../../../pages/TablePage';


export const createReduxStore = (initialState?: StateSchema) => {

    const store = configureStore({
        reducer: {
            table: tableReducer,
        },
        preloadedState: initialState,
    })

    return store;
}

export type AppStore = ReturnType<typeof createReduxStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']