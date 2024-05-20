import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { searchHomesSlice } from "./features/searchHomes.slice";

const rootReducer = combineSlices(searchHomesSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
