"use client";
import { decodeHtmlEntities } from "@/app/utils";
import { Stack } from "@mui/joy";
import { HOMES_PER_PAGE } from "../constants";
import {
  selectHomes,
  selectIsLoadingHomes,
  selectPages,
  selectSearchQuery,
} from "../redux/features/searchHomes.slice";
import { useAppSelector } from "../redux/hooks";
import Filters from "./Filters";
import Pagination from "./Pagination";
import PropertyCard from "./PropertyCard";

export const HomesList = () => {
  const homes = useAppSelector(selectHomes);
  const searchQuery = useAppSelector(selectSearchQuery);
  const isLoadingHomes = useAppSelector(selectIsLoadingHomes);
  const { currentPage } = useAppSelector(selectPages);

  const currentData = homes.slice(
    (currentPage - 1) * HOMES_PER_PAGE,
    currentPage * HOMES_PER_PAGE
  );

  const marginTop =
    searchQuery.length > 60 ? { xs: 10, md: 7 } : { xs: 7, md: 3 };

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          px: { xs: 2, md: 4 },
          pt: 2,
          mt: marginTop,
          gridRow: "4 / 6",
          gridColumn: "1 / 5",
        }}
      >
        <Filters />
        <Stack spacing={2} sx={{ overflow: "auto" }}>
          {isLoadingHomes &&
            new Array(5).fill(0).map((_, i) => {
              return (
                <PropertyCard
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

          {currentData.map((home) => {
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
                image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
              />
            );
          })}
        </Stack>
        {homes.length > 0 && <Pagination siblingCount={2} boundaryCount={1} />}
      </Stack>
    </>
  );
};
