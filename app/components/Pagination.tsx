"use client";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { createRange } from "@/app/utils";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectPages, setPages } from "../redux/features/searchHomes.slice";

interface PaginationProps {
  siblingCount: number;
  boundaryCount: number;
}

export default function Pagination(props: PaginationProps) {
  const { siblingCount, boundaryCount } = props;
  const { currentPage, totalPages } = useAppSelector(selectPages);
  const dispatch = useAppDispatch();

  const paginationRange = (): (number | string)[] => {
    const totalNumbers = siblingCount + boundaryCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

      let pages: (number | string)[] = createRange(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = endPage < totalPages - 1;
      const spillOffset = totalNumbers - pages.length - 1;

      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = createRange(startPage - spillOffset, startPage - 1);
        pages = ["…left", ...extraPages, ...pages];
      } else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = createRange(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, "…right"];
      } else if (hasLeftSpill && hasRightSpill) {
        pages = ["…left", ...pages, "…right"];
      }

      return [1, ...pages, totalPages];
    }

    return createRange(1, totalPages);
  };

  const nextPageHandler = () => {
    dispatch(
      setPages({
        currentPage: Math.min(currentPage + 1, totalPages),
        totalPages,
      })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevPageHandler = () => {
    dispatch(
      setPages({ currentPage: Math.max(currentPage - 1, 1), totalPages })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          mx: 2,
          my: 1,
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="soft"
          color="neutral"
          size="sm"
          onClick={() => prevPageHandler()}
          disabled={currentPage === 1}
        >
          <ArrowBackIosRoundedIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto" sx={{ color: "black" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <IconButton
          aria-label="next page"
          variant="soft"
          color="neutral"
          size="sm"
          onClick={() => nextPageHandler()}
          disabled={currentPage === totalPages}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </Box>
      <Box
        className="Pagination-laptopUp"
        sx={{
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
          mx: 4,
          my: 2,
        }}
      >
        <Button
          size="sm"
          variant="soft"
          color="neutral"
          disabled={currentPage === 1}
          onClick={() => prevPageHandler()}
          startDecorator={<ArrowBackIosRoundedIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {paginationRange().map((page) => {
          if (typeof page === "string") {
            return (
              <IconButton key={page} size="sm" variant="soft" disabled>
                <strong>...</strong>
              </IconButton>
            );
          }

          return (
            <IconButton
              key={page}
              size="sm"
              variant={currentPage === page ? "solid" : "soft"}
              color="neutral"
              onClick={() => {
                dispatch(setPages({ currentPage: page, totalPages }));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {page}
            </IconButton>
          );
        })}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="soft"
          color="neutral"
          onClick={() => nextPageHandler()}
          disabled={currentPage === totalPages}
          endDecorator={<ArrowForwardIosRoundedIcon />}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}
