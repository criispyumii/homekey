"use server";

import { AutoCompleteResponse, USBoundaries } from "../types";

export const autocompleteSearch = async (
  searchQuery: string
): Promise<AutoCompleteResponse> => {
  if (!searchQuery.length) throw "searchQuery string must be of length > 0";

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": `${process.env.GOOGLE_API_KEY}`,
        },
        body: JSON.stringify({
          input: searchQuery,
          languageCode: "en",
          includedRegionCodes: ["us"],
          includedPrimaryTypes: ["locality", "postal_code", "neighborhood"],
          locationRestriction: {
            rectangle: {
              low: {
                latitude: USBoundaries.LAT_LOW,
                longitude: USBoundaries.LNG_LOW,
              },
              high: {
                latitude: USBoundaries.LAT_HIGH,
                longitude: USBoundaries.LNG_HIGH,
              },
            },
          },
        }),
      }
    );

    return await res.json();
  } catch (err) {
    throw new Error(
      JSON.stringify(err) +
        `Failure in calling google autocomplete api. searchQuery: ${searchQuery}`
    );
  }
};
