import { Home } from "@/app/server/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Pages {
  currentPage: number;
  totalPages: number;
}

interface SearchAreaSliceState {
  search_query: string;
  homes: Home[];
  results_summary: string;
  location_message: string;
  is_loading: boolean;
  pages: Pages;
}

const initialState: SearchAreaSliceState = {
  search_query: "",
  homes: [],
  results_summary: "",
  location_message: "",
  is_loading: false,
  pages: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const searchHomesSlice = createSlice({
  name: "searchHomes",
  initialState,

  reducers: (create) => ({
    setSearchQuery: create.reducer((state, action: PayloadAction<string>) => {
      state.search_query = action.payload;
    }),
    setHomes: create.reducer((state, action: PayloadAction<Home[]>) => {
      state.homes = action.payload;
    }),
    setResultsSummary: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.results_summary = action.payload;
      }
    ),
    setLocationMessage: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.location_message = action.payload;
      }
    ),
    setIsLoadingHomes: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.is_loading = action.payload;
      }
    ),
    setPages: create.reducer((state, action: PayloadAction<Pages>) => {
      state.pages.currentPage = action.payload.currentPage;
      state.pages.totalPages = action.payload.totalPages;
    }),
  }),
  selectors: {
    selectSearchQuery: (searchHomes) => searchHomes.search_query,
    selectHomes: (searchHomes) => searchHomes.homes,
    selectResultsSummary: (searchHomes) => searchHomes.results_summary,
    selectLocationMessage: (searchHomes) => searchHomes.location_message,
    selectIsLoadingHomes: (searchHomes) => searchHomes.is_loading,
    selectPages: (searchHomes) => searchHomes.pages,
  },
});

export const {
  setSearchQuery,
  setHomes,
  setLocationMessage,
  setResultsSummary,
  setIsLoadingHomes,
  setPages,
} = searchHomesSlice.actions;

export const {
  selectSearchQuery,
  selectHomes,
  selectResultsSummary,
  selectLocationMessage,
  selectIsLoadingHomes,
  selectPages,
} = searchHomesSlice.selectors;
