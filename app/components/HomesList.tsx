"use client";
import { decodeHtmlEntities } from "@/app/utils";
import { Stack } from "@mui/joy";
import { HOMES_PER_PAGE } from "../constants";
import {
  selectHomes,
  selectIsLoadingHomes,
  selectLocationMessage,
  selectPages,
  selectResultsSummary,
  setIsLoadingPhotos,
} from "../redux/features/searchHomes.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Filters from "./Filters";
import Pagination from "./Pagination";
import PropertyCard from "./PropertyCard";
import { fetchPhoto } from "../server/actions/getPhotos";
import { useEffect, useMemo, useState } from "react";

export const HomesList = () => {
  const homes = useAppSelector(selectHomes);
  const { currentPage } = useAppSelector(selectPages);
  const isLoadingHomes = useAppSelector(selectIsLoadingHomes);
  const [photos, setPhotos] = useState<{ [page: number]: string[] }>({});
  const resultsSummary = useAppSelector(selectResultsSummary);
  const locationMessage = useAppSelector(selectLocationMessage);
  const [fetchedPages, setFetchedPages] = useState(new Set<number>());
  const dispatch = useAppDispatch();

  const currentData = useMemo(
    () =>
      homes.slice(
        (currentPage - 1) * HOMES_PER_PAGE,
        currentPage * HOMES_PER_PAGE
      ),
    [homes, currentPage]
  );

  useEffect(() => {
    const fetchAllPhotos = async () => {
      dispatch(setIsLoadingPhotos(true));
      const photoPromises = currentData.map((home) => fetchPhoto(home.url));
      const fetchedPhotos = await Promise.all(photoPromises);
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [currentPage - 1]: fetchedPhotos,
      }));
      dispatch(setIsLoadingPhotos(false));
    };

    if (currentData.length > 0 && !fetchedPages.has(currentPage)) {
      fetchAllPhotos();
      setFetchedPages((prev) => new Set(prev).add(currentPage));
    }
  }, [currentData, currentPage, fetchedPages, dispatch]);

  const marginTop =
    resultsSummary.length > 100 ? { xs: 20, md: 7 } : { xs: 10 };
  const gridRow = locationMessage
    ? { xs: "5 / 6" }
    : { xs: "5 / 6", sm: "3 / 6", md: "4/6" };

  return (
    <Stack
      spacing={2}
      sx={{
        px: { xs: 2, md: 4 },
        pt: 2,
        mt: marginTop,
        gridColumn: "1 / 5",
      }}
      gridRow={gridRow}
    >
      <Filters />
      <Stack spacing={2} sx={{ overflow: "auto" }}>
        {isLoadingHomes &&
          new Array(5).fill(0).map((_, i) => {
            return (
              <PropertyCard
                data-last-child="loading_property_card"
                key={i}
                price={1000000}
                bedrooms={3}
                bathrooms={2}
                title={"12345 Mary Lane"}
                cityState="Los Angeles, CA"
                category="Contractor's Special! Great starter home featuring 2 bedrooms, 1 bathroom, a living room, dining area, kitchen, spacious yard, and a full basement in the desirable Ingleside Heights neighborhood. Fixer upper home needs updates. Discover expansion possibilities with assistance from the city planning department."
                sqFt={1000}
                stories={3}
                yearBuilt={1990}
                url={
                  "www.redfin.com/CA/San-Francisco/142-Bright-St-94132/home/1257743"
                }
                image=""
              />
            );
          })}

        {!isLoadingHomes &&
          currentData.map((home, i) => {
            const {
              listingId,
              streetLine,
              city,
              state,
              listingRemarks,
              price,
              beds,
              baths,
              sqFt,
              stories,
              yearBuilt,
              url,
            } = home;

            return (
              <PropertyCard
                key={listingId}
                price={price.value}
                bedrooms={beds}
                bathrooms={baths}
                title={streetLine.value}
                cityState={`${city}, ${state}`}
                category={decodeHtmlEntities(listingRemarks)}
                sqFt={sqFt.value}
                stories={stories}
                yearBuilt={yearBuilt.value}
                url={url}
                image={
                  photos[currentPage - 1] ? photos[currentPage - 1][i] : ""
                }
              />
            );
          })}
      </Stack>
      {homes.length > 0 && <Pagination siblingCount={2} boundaryCount={1} />}
    </Stack>
  );
};
