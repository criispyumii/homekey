"use server";

import { GetHomesParams, GetHomesResponse } from "../types";

export const getHomes = async (params: GetHomesParams): Promise<GetHomesResponse> => {
  const { location, ...restParams } = params;
  const queryParams = new URLSearchParams();

  queryParams.set("location", location);

  for (const [key, value] of Object.entries(restParams)) {
    if (value) {
      queryParams.set(key, value.toString());
    }
  }

  const queryString = queryParams.toString();

  try {
    const res = await fetch(
      `https://redfin-com-data.p.rapidapi.com/property/search?${queryString}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
          "X-RapidAPI-Host": "redfin-com-data.p.rapidapi.com",
        },
      }
    );

    const data = (await res.json()) as GetHomesResponse;

    return data;
  } catch (err) {
    throw new Error(
      JSON.stringify(err) + `Failure in getting homes for location: ${location}`
    );
  }
};
