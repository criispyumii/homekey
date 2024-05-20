"use client";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { KeyboardEvent, useState } from "react";
import { Alert, Textarea } from "@mui/joy";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setSearchQuery,
  setHomes,
  setResultsSummary,
  selectResultsSummary,
  selectLocationMessage,
  setLocationMessage,
  setIsLoadingHomes,
  selectIsLoadingHomes,
  setPages,
  selectHomes,
  selectSearchLocation,
} from "../redux/features/searchHomes.slice";
import { getParams } from "../server/actions/getParams";
import { getHomes } from "../server/actions/getHomes";
import { HOMES_PER_PAGE, paramImportance } from "../constants";
import { GetHomesParams, ValueOfGetHomesParams } from "../server/types";
import { getRefinedMessage } from "../server/actions/refineMessage";
import { PlacesAutocomplete } from "./PlacesAutocomplete";

export default function Search() {
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [autocompleteError, setAutocompleteError] = useState(false);
  const isLoadingHomes = useAppSelector(selectIsLoadingHomes);
  const homes = useAppSelector(selectHomes);
  const resultsSummary = useAppSelector(selectResultsSummary);
  const missingLocationMessage = useAppSelector(selectLocationMessage);
  const searchLocation = useAppSelector(selectSearchLocation);
  const dispatch = useAppDispatch();

  const onChangeHandler = (inputValue: string) => {
    setValue(inputValue);
    setInputError(false);
  };

  const onEnterHandler = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      await onClickHandler(value);
    }
  };

  // logic can be cleaned up
  // due to lack of time, was not able to refactor.
  const reAttemptSearch = async (
    params: GetHomesParams,
    noInitialLocation = false
  ): Promise<void> => {
    if (noInitialLocation) {
      // should get params again because summary was wrong!! (says LA, but La Habra)
      // have a message about what we thought their location was...
      // due to lack of time, was not able to implement
      // can export this block into a separate function

      const res = await getHomes(params);
      const homes = res.data?.homes;

      if (homes && homes.length) {
        dispatch(setHomes(homes));
        dispatch(
          setPages({
            currentPage: 1,
            totalPages: Math.ceil(homes.length / HOMES_PER_PAGE),
          })
        );
        dispatch(
          setResultsSummary(`${homes.length} found homes in ${params.location}`)
        );
        dispatch(setIsLoadingHomes(false));
        return;
      }
    }

    let searchParams = { ...params };
    const removedParams: {
      key: keyof GetHomesParams;
      value: ValueOfGetHomesParams;
    }[] = [];

    const remainingParams: {
      key: keyof GetHomesParams;
      value: ValueOfGetHomesParams;
    }[] = [];

    const filteredParamImportance = paramImportance.filter(
      (key) => key in searchParams
    );

    for (let i = 0; i < filteredParamImportance.length; i++) {
      const currentKey = filteredParamImportance[i];
      removedParams.push({ key: currentKey, value: searchParams[currentKey] });
      delete searchParams[currentKey];

      const homesData = await getHomes(searchParams);

      if (homesData.message === "Success") {
        if (homesData.data?.homes.length) {
          const homes = homesData.data.homes;

          for (const key in searchParams) {
            remainingParams.push({
              key: key as keyof GetHomesParams,
              value: searchParams[key as keyof GetHomesParams],
            });
          }

          const removedParamsString = removedParams
            .map((param) => `${param.key}: ${param.value}`)
            .join(", ");

          const filteredRemainingParams = remainingParams.filter(
            (param) =>
              param.key !== "summary" &&
              param.key !== "home_type" &&
              param.key !== "page"
          );
          const remainingParamsString = filteredRemainingParams
            .map((param) => `${param.key}: ${param.value}`)
            .join(", ");

          const message = `We weren't able to find homes with ${removedParamsString}. However, we found homes which have: ${remainingParamsString}.`;
          const refinedMessage = await getRefinedMessage(message);

          dispatch(
            setResultsSummary(refinedMessage + ` (${homes.length} found homes)`)
          );
          dispatch(setHomes(homes));
          dispatch(
            setPages({
              currentPage: 1,
              totalPages: Math.ceil(homes.length / HOMES_PER_PAGE),
            })
          );
          dispatch(setIsLoadingHomes(false));
          return;
        }
      }
    }

    dispatch(
      setLocationMessage(
        `We couldn't find homes in ${params.location}! We have used San Francisco as a sample`
      )
    );
    params.location = "San Francisco";

    return reAttemptSearch(params, true);
  };

  const onClickHandler = async (inputValue: string) => {
    if (inputValue.length === 0) {
      setInputError(true);
      return;
    }

    if (searchLocation === null) {
      setAutocompleteError(true);
      return;
    }

    dispatch(setSearchQuery(inputValue));
    dispatch(setIsLoadingHomes(true));
    dispatch(setResultsSummary(""));
    dispatch(setLocationMessage(""));

    const params = await getParams(inputValue);

    params.location =
      searchLocation.placePrediction.structuredFormat.mainText.text;

    // this below can be cleaned up!
    const getHomesRes = await getHomes(params);
    if (getHomesRes.data) {
      const { homes } = getHomesRes.data;

      if (!homes.length) {
        return await reAttemptSearch(params);
      } else {
        dispatch(setHomes(homes));
        dispatch(
          setResultsSummary(params.summary + ` (${homes.length} found homes)`)
        );
        dispatch(
          setPages({
            currentPage: 1,
            totalPages: Math.ceil(homes.length / HOMES_PER_PAGE),
          })
        );
        dispatch(setIsLoadingHomes(false));
        return;
      }
    } else if (getHomesRes.message === "Location is not available") {
      const suggestedLocation = getHomesRes?.suggestionLocation?.[0].location;

      if (suggestedLocation?.length) {
        params.location = suggestedLocation;
        return await reAttemptSearch(params, true);
      }
    }

    return await reAttemptSearch(params, true);
  };

  return (
    <div>
      <Stack
        spacing={1}
        direction={{ sm: "row", xs: "column" }}
        alignItems={{ xs: "center", sm: "stretch" }}
        justifyContent={{ xs: "center" }}
        sx={{ mb: 2 }}
      >
        <FormControl sx={{ flex: 1, maxWidth: 500 }}>
          <Textarea
            aria-label="Search"
            value={value}
            onChange={(e) => onChangeHandler(e.target.value)}
            onKeyDown={(e) => onEnterHandler(e)}
            error={inputError}
            placeholder="Type your home requirements..."
            disabled={isLoadingHomes}
            size="lg"
            sx={{ flex: 1 }}
          />
        </FormControl>
        <PlacesAutocomplete
          error={autocompleteError}
          setError={setAutocompleteError}
        />
        <Button
          variant="solid"
          color="primary"
          onClick={() => onClickHandler(value)}
          endDecorator={<SearchRoundedIcon />}
          loading={isLoadingHomes}
        >
          Search
        </Button>
      </Stack>
      <Stack direction={"column"} alignItems={"center"}>
        {missingLocationMessage && homes.length > 0 && resultsSummary && (
          <Alert sx={{ mb: 2, fontWeight: "600" }}>
            {missingLocationMessage}
          </Alert>
        )}
        {resultsSummary && (
          <Alert
            size="lg"
            sx={{ textAlign: "center", maxWidth: 750, fontWeight: "600" }}
            color="success"
          >
            {resultsSummary}
          </Alert>
        )}
      </Stack>
    </div>
  );
}
