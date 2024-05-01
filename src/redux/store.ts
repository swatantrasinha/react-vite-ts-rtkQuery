import { configureStore } from "@reduxjs/toolkit";
import { pokemonsApi } from "./features/pokemonsSlice";
import { myReducer } from "./features/reducer";

// Adding the api middleware enables caching, invalidation, polling,
// and other useful features of `rtk-query`

export const store = configureStore({
  reducer: {
    [pokemonsApi.reducerPath]: pokemonsApi.reducer,
    [myReducer.name]: myReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState= ReturnType <typeof store.getState>;