"use server";

import { GetPhotosResponse } from "../types";

export const getPhotos = async (
  listingUrl: string
): Promise<GetPhotosResponse> => {
  try {
    const res = await fetch(
      `https://redfin-com-data.p.rapidapi.com/property/detail-photos?url=https://www.redfin.com/${listingUrl}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
          "X-RapidAPI-Host": "redfin-com-data.p.rapidapi.com",
        },
      }
    );

    const data = (await res.json()) as GetPhotosResponse;

    return data;
  } catch (err) {
    throw new Error(
      JSON.stringify(err) +
        `Failure in getting photos for listingUrl: ${listingUrl}`
    );
  }
};
