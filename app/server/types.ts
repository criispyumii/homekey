// INPUTS TO QUERY HOMES (getParams)
export interface GetHomesParams {
  page: 1;
  home_type: "House";
  location: string;
  summary: string;
  min_bedroom?: number;
  max_bedroom?: number;
  min_bathroom?: number;
  max_price?: number;
  min_price?: number;
  min_square_feet?: number;
  max_square_feet?: number;
  has_view?: boolean;
  has_fireplace?: boolean;
  has_waterfront?: boolean;
  has_include_outdoor_parking?: boolean;
  garage_spots?: number;
  min_year_built?: number;
  max_year_built?: number;
  min_stories?: number;
  max_stories?: number;
  time_on_redfin?: string;
  has_green_home?: boolean;
  has_accessible_home?: boolean;
  has_air_conditioning?: boolean;
  has_rv_parking?: boolean;
  has_primary_bedroom_on_main_floor?: boolean;
  has_pets_allowed?: boolean;
  has_washer_dryer_hookup?: boolean;
  has_basement?: boolean;
  has_elevator?: boolean;
  has_guest_house?: boolean;
  pool_type?:
    | "PrivatePool"
    | "CommunityPool"
    | "PrivateOrCommunityPool"
    | "NoPrivatePool";
  listing_type?: "ByAgent" | "ByOwner" | "NewConstruction" | "Foreclosures";
  keyword_search?: string;
}

type ValueOf<T> = T[keyof T];
export type ValueOfGetHomesParams = ValueOf<GetHomesParams>;

// AUTOCOMPLETE LOCATIONS (autocomplete)
/* eslint-disable */
export enum USBoundaries {
  LAT_LOW = "24.396308",
  LNG_LOW = "-125.000000",
  LAT_HIGH = "49.3457868",
  LNG_HIGH = "-66.93457",
}
/* eslint-enable */

export interface PlacePrediction {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
    structuredFormat: {
      mainText: {
        text: string;
      };
      secondaryText: {
        text: string;
      };
    };
  };
}

export interface AutoCompleteResponse {
  suggestions: PlacePrediction[];
}

// HOMES RESPONSE (getHomes)
export interface Home {
  baths: number;
  beds: number;
  city: string;
  countryCode: string;
  fullBaths: number;
  has3DTour: boolean;
  hasInsight: boolean;
  hasVideoTour: boolean;
  hasVirtualTour: boolean;
  hideSalePrice: boolean;
  isHoaFrequencyKnown: boolean;
  isHot: boolean;
  isNewConstruction: boolean;
  isRedfin: boolean;
  isShortlisted: boolean;
  isViewedListing: boolean;
  latLong: {
    value: {
      latitude: number;
      longitude: number;
    };
  };
  listingAgent: {
    name: string;
  };
  listingId: number;
  listingRemarks: string;
  location: {
    value: string;
  };
  lotSize: {
    value: number;
  };
  openHouseEnd: number;
  openHouseEventName: string;
  openHouseStart: number;
  openHouseStartFormatted: string;
  originalTimeOnRedfin: {
    value: number;
  };
  partialBaths: number;
  postalCode: {
    value: number;
  };
  posterFrameUrl: string;
  price: {
    value: number;
  };
  pricePerSqFt: {
    value: number;
  };
  propertyId: 30984139;
  scanUrl: string;
  sqFt: {
    value: number;
  };
  state: string;
  stories: number;
  streetLine: {
    value: string;
  };
  timeZone: string;
  url: string;
  yearBuilt: {
    value: number;
  };
  zip: number;
}

interface SuggestionLocation {
  location: string;
}

export interface GetHomesResponse {
  data: {
    homes: Home[];
  } | null;
  message: string;
  resultsPerPage: number;
  status: boolean;
  totalResultCount: number;
  suggestionLocation?: SuggestionLocation[];
}

// FETCH HOME PHOTOS (getPhotos)
interface PhotosUrl {
  fullScreenPhotoUrl: string;
  lightboxListUrl: string;
  nonFullScreenPhotoUrl: string;
  nonFullScreenPhotoUrlCompressed: string;
}

interface Photos {
  displayLevel: number;
  fileName: string;
  height: number;
  photoId: number;
  photoType: string;
  photoUrls: PhotosUrl;
  subdirectory: string;
  thumbnailData: {
    thumbnailUrl: string;
  };
  width: number;
}

export interface GetPhotosResponse {
  data: Photos[];
  message: string;
  status: boolean;
  typeName: string;
}

// OPEN AI (refineMessage)
interface OpenAIMessage {
  role: string;
  content: string;
}

interface OpenAIChoices {
  index: number;
  message: OpenAIMessage;
  finish_reason: string;
}

export interface OpenAIResponse {
  choices: OpenAIChoices[];
}
