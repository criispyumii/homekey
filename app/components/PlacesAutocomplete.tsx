"use client";

import {
  Autocomplete,
  AutocompleteOption,
  CircularProgress,
  ListItemContent,
  ListItemDecorator,
  SvgIcon,
  Typography,
} from "@mui/joy";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { LocationSVG } from "../../public/LocationSVG";
import {
  selectSearchLocation,
  setSearchLocation,
} from "../redux/features/searchHomes.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { autocompleteSearch } from "../server/actions/autocomplete";
import { PlacePrediction } from "../server/types";

interface Props {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
}

export const PlacesAutocomplete = ({ error, setError }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<PlacePrediction[]>([]);
  const [noOptionsFound, setNoOptionsFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchLocation = useAppSelector(selectSearchLocation);
  const dispatch = useAppDispatch();

  const inputChangeHandler = async (searchQuery: string) => {
    setIsLoading(true);
    const data = await autocompleteSearch(searchQuery);

    if (data?.suggestions?.length) {
      setOptions(data.suggestions);
      if (noOptionsFound) setNoOptionsFound(false);
    } else {
      if (!noOptionsFound) setNoOptionsFound(true);
      setOptions([]);
    }

    setIsLoading(false);
  };

  return (
    <Autocomplete
      freeSolo={!noOptionsFound}
      endDecorator={isLoading ? <CircularProgress size="sm" /> : null}
      getOptionLabel={(option) =>
        typeof option !== "string" ? option.placePrediction.text.text : option
      }
      inputValue={inputValue}
      isOptionEqualToValue={(option, value) =>
        option.placePrediction.placeId === value.placePrediction.placeId
      }
      loading={isLoading}
      noOptionsText="Couldn't find your city or zipcode. "
      onChange={async (e, newValue) => {
        if (!newValue) setOptions([]);
        else if (typeof newValue !== "string") {
          dispatch(setSearchLocation(newValue));
        }
      }}
      onInputChange={(e, newInputValue) => {
        if (error) setError(false);
        setInputValue(newInputValue);

        if (newInputValue === "") {
          setOptions([]);
          dispatch(setSearchLocation(null));
          return;
        }

        inputChangeHandler(newInputValue);
      }}
      error={error}
      options={options}
      placeholder="Type a city or zipcode ..."
      renderOption={(props, option) => (
        <AutocompleteOption {...props} key={option.placePrediction.placeId}>
          <Fragment key={option.placePrediction.placeId}>
            <ListItemDecorator>
              <SvgIcon>
                <LocationSVG />
              </SvgIcon>
            </ListItemDecorator>
            <ListItemContent sx={{ fontSize: "md" }}>
              {option.placePrediction.structuredFormat.mainText.text}
              <Typography level="body-sm">
                ({option.placePrediction.structuredFormat.secondaryText.text})
              </Typography>
            </ListItemContent>
          </Fragment>
        </AutocompleteOption>
      )}
      sx={{ width: 250 }}
      value={searchLocation}
    ></Autocomplete>
  );
};
