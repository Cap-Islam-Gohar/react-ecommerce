import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Features/AuthSlice";
import { api } from "./Api/Service";
import RootSlice from "./Features/RootSlice";


const Store = configureStore({
    reducer: {
        root: RootSlice,
        [api.reducerPath]: api.reducer,
        auth: AuthSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware),
});

export default Store;