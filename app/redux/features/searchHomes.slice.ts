import { Home, PlacePrediction } from "@/app/server/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Pages {
  currentPage: number;
  totalPages: number;
}

interface SearchAreaSliceState {
  search_query: string;
  search_location: PlacePrediction | null;
  homes: Home[];
  results_summary: string;
  location_message: string;
  is_loading_homes: boolean;
  is_loading_photos: boolean;
  pages: Pages;
}

const initialState: SearchAreaSliceState = {
  search_query: "",
  search_location: null,
  homes: [],
  results_summary: "",
  location_message: "",
  is_loading_homes: false,
  is_loading_photos: false,
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
    setSearchLocation: create.reducer(
      (state, action: PayloadAction<PlacePrediction | null>) => {
        state.search_location = action.payload;
      }
    ),
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
        state.is_loading_homes = action.payload;
      }
    ),
    setIsLoadingPhotos: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.is_loading_photos = action.payload;
      }
    ),
    setPages: create.reducer((state, action: PayloadAction<Pages>) => {
      state.pages.currentPage = action.payload.currentPage;
      state.pages.totalPages = action.payload.totalPages;
    }),
  }),
  selectors: {
    selectSearchQuery: (searchHomes) => searchHomes.search_query,
    selectSearchLocation: (searchHomes) => searchHomes.search_location,
    selectHomes: (searchHomes) => searchHomes.homes,
    selectResultsSummary: (searchHomes) => searchHomes.results_summary,
    selectLocationMessage: (searchHomes) => searchHomes.location_message,
    selectIsLoadingHomes: (searchHomes) => searchHomes.is_loading_homes,
    selectIsLoadingPhotos: (searchHomes) => searchHomes.is_loading_photos,
    selectPages: (searchHomes) => searchHomes.pages,
  },
});

export const {
  setSearchQuery,
  setSearchLocation,
  setHomes,
  setLocationMessage,
  setResultsSummary,
  setIsLoadingHomes,
  setIsLoadingPhotos,
  setPages,
} = searchHomesSlice.actions;

export const {
  selectSearchQuery,
  selectSearchLocation,
  selectHomes,
  selectResultsSummary,
  selectLocationMessage,
  selectIsLoadingHomes,
  selectIsLoadingPhotos,
  selectPages,
} = searchHomesSlice.selectors;
