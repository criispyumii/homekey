"use server";

import { GetPhotosResponse } from "../types";

const getPhotos = async (listingUrl: string): Promise<GetPhotosResponse> => {
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

export const fetchPhoto = async (listingUrl: string) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400";

  try {
    const photosData = await getPhotos(listingUrl);
    const photosUrl = photosData?.data[0].photoUrls;
    const foundImage =
      photosUrl.nonFullScreenPhotoUrlCompressed ||
      photosUrl.nonFullScreenPhotoUrl ||
      photosUrl.fullScreenPhotoUrl ||
      photosUrl.lightboxListUrl;
    if (foundImage) return foundImage;
  } catch (error) {
    console.error("Error fetching photo, will use default. Error: ", error);
  }

  return defaultImage;
};
