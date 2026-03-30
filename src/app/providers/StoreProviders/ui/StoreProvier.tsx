import { Provider } from "react-redux"
import type { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";



interface StoreProviderProps {
    children: React.ReactNode;
    initialState?: StateSchema;
}

export const StoreProvider = (props: StoreProviderProps) => {

    const {
        children,
        initialState,
    } = props;

    const store = createReduxStore(
        initialState as StateSchema,
      
    );

    return <Provider store={store}>{children}</Provider>
}