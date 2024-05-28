"use client";
import {
  CalendarMonth,
  InsertLink,
  SquareFoot,
  Wc,
  WebStories,
} from "@mui/icons-material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import { Skeleton } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import React, { useState } from "react";
import {
  selectIsLoadingHomes,
  selectIsLoadingPhotos,
} from "../redux/features/searchHomes.slice";
import { useAppSelector } from "../redux/hooks";
import Image from "next/image";

type PropertyCardProps = {
  bedrooms: number;
  bathrooms: number;
  cityState: string;
  price: number;
  category: React.ReactNode;
  image: string;
  liked?: boolean;
  rareFind?: boolean;
  title: React.ReactNode;
  sqFt: number;
  stories: number;
  yearBuilt: number;
  url: string;
};

export default function PropertyCard(props: PropertyCardProps) {
  const {
    category,
    title,
    rareFind = false,
    liked = false,
    image,
    cityState,
    bathrooms,
    bedrooms,
    price,
    sqFt,
    stories,
    yearBuilt,
    url,
  } = props;

  const [isLiked, setIsLiked] = useState(liked);
  const isLoadingHomes = useAppSelector(selectIsLoadingHomes);
  const isLoadingPhotos = useAppSelector(selectIsLoadingPhotos);

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        bgcolor: "neutral.softBg",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        "&:hover": {
          boxShadow: "lg",
          borderColor: "var(--joy-palette-neutral-outlinedDisabledBorder)",
        },
      }}
    >
      <CardOverflow
        sx={{
          mr: { xs: "var(--CardOverflow-offset)", sm: 0 },
          mb: { xs: 0, sm: "var(--CardOverflow-offset)" },
          "--AspectRatio-radius": {
            xs: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0",
            sm: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))",
          },
        }}
      >
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 120, md: 160 },
            "--AspectRatio-maxHeight": { xs: "160px", sm: "9999px" },
          }}
        >
          <Skeleton loading={isLoadingHomes || isLoadingPhotos}>
            <Image
              alt="Property Image"
              src={
                image ||
                "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
              }
              fill
              priority
              sizes="(max-width: 180px) 100vw"
            />
          </Skeleton>
          <Stack
            alignItems="center"
            direction="row"
            sx={{ position: "absolute", top: 0, width: "100%", p: 1 }}
          >
            {rareFind && (
              <Chip
                variant="soft"
                color="success"
                startDecorator={<WorkspacePremiumRoundedIcon />}
                size="md"
              >
                Rare find
              </Chip>
            )}
            <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? "danger" : "neutral"}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: "flex", sm: "none" },
                ml: "auto",
                borderRadius: "50%",
                zIndex: "20",
              }}
            >
              <Skeleton loading={isLoadingHomes} />
              <FavoriteRoundedIcon />
            </IconButton>
          </Stack>
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <div>
            <Typography level="body-sm" sx={{ mb: 2 }}>
              <Skeleton loading={isLoadingHomes}>{category}...</Skeleton>
            </Typography>
            <Typography level="title-md">
              <Skeleton loading={isLoadingHomes}>{title}</Skeleton>
            </Typography>
          </div>
          <IconButton
            variant="plain"
            size="sm"
            color={isLiked ? "danger" : "neutral"}
            onClick={() => setIsLiked((prev) => !prev)}
            sx={{
              display: { xs: "none", sm: "flex" },
              borderRadius: "50%",
            }}
          >
            <Skeleton loading={isLoadingHomes} />
            <FavoriteRoundedIcon />
          </IconButton>
        </Stack>
        <Stack
          spacing="0.25rem 1rem"
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ my: 0.25 }}
        >
          <Typography
            level="body-xs"
            startDecorator={
              <>
                <FmdGoodRoundedIcon />
                <Skeleton loading={isLoadingHomes} />
              </>
            }
          >
            <Skeleton loading={isLoadingHomes}>{cityState}</Skeleton>
          </Typography>

          <Typography
            level="body-xs"
            startDecorator={
              <>
                <KingBedRoundedIcon />
                <Skeleton loading={isLoadingHomes} />
              </>
            }
          >
            <Skeleton loading={isLoadingHomes}>{bedrooms} rooms</Skeleton>
          </Typography>
          <Typography
            level="body-xs"
            startDecorator={
              <>
                <Wc />
                <Skeleton loading={isLoadingHomes} />
              </>
            }
          >
            <Skeleton loading={isLoadingHomes}>{bathrooms} baths</Skeleton>
          </Typography>
        </Stack>
        <Stack direction="row">
          <Stack
            direction="row"
            spacing="0.25rem 1rem"
            useFlexGap
            sx={{ mt: "auto" }}
          >
            <Typography
              level="body-xs"
              startDecorator={
                <>
                  <SquareFoot />
                  <Skeleton loading={isLoadingHomes} />
                </>
              }
            >
              <Skeleton loading={isLoadingHomes}>{sqFt} SqFt</Skeleton>
            </Typography>
            {stories > 1 && (
              <Typography
                level="body-xs"
                startDecorator={
                  <>
                    <WebStories />
                    <Skeleton loading={isLoadingHomes} />
                  </>
                }
              >
                <Skeleton loading={isLoadingHomes}>{stories} stories</Skeleton>
              </Typography>
            )}
            {yearBuilt && (
              <Typography
                level="body-xs"
                startDecorator={
                  <>
                    <CalendarMonth />
                    <Skeleton loading={isLoadingHomes} />
                  </>
                }
              >
                <Skeleton loading={isLoadingHomes}>
                  Year Built: {yearBuilt}
                </Skeleton>
              </Typography>
            )}
          </Stack>
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: "right" }}>
            <Skeleton loading={isLoadingHomes}>
              <strong>{`$${price.toLocaleString()}`}</strong>{" "}
            </Skeleton>
          </Typography>
        </Stack>
        <Typography
          level="body-xs"
          startDecorator={
            <>
              <InsertLink />
              <Skeleton loading={isLoadingHomes} />
            </>
          }
          sx={{ mt: 1 }}
        >
          <Skeleton loading={isLoadingHomes}>
            {
              <a
                target="_blank"
                href={`https://www.redfin.com${url}`}
              >{`www.redfin.com${url}`}</a>
            }
          </Skeleton>
        </Typography>
      </CardContent>
    </Card>
  );
}
