import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { searchHomesSlice } from "./features/searchHomes.slice";

const rootReducer = combineSlices(searchHomesSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
