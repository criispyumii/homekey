import React from "react";
import { screen } from "@testing-library/react";
import { HomesList } from "../HomesList";
import { initialState } from "@/app/redux/features/searchHomes.slice";
import { renderWithProviders } from "@/app/redux/test-utils";

describe("HomesList tests", () => {
  describe("Default PropertyCard", () => {
    test("Renders if isLoadingHomes is true", () => {
      renderWithProviders(<HomesList />, {
        preloadedState: {
          searchHomes: {
            ...initialState,
            is_loading_homes: true,
          },
        },
      });

      const loadingPropertyCardEl =
        screen.getAllByText(/Contractor's Special/i)[0];
      expect(loadingPropertyCardEl).toBeInTheDocument();
    });

    test("Does not render if isLoadingHomes is false", () => {
      renderWithProviders(<HomesList />, {
        preloadedState: {
          searchHomes: {
            ...initialState,
            is_loading_homes: false,
          },
        },
      });

      const loadingPropertyCardEl = screen.queryByText(/Contractor's Special/i);
      expect(loadingPropertyCardEl).not.toBeInTheDocument();
    });
  });
});
