import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchData, movieOptions } from "../utils/fetchData";
import { useDispatch } from "react-redux";
import { setMovies } from "../redux/movieSlice";
import { useMemo } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Link,
  Stack,
  Pagination,
} from "@mui/material";

const MoviesList = ({
  adultInclude,
  videoInclude,
  language,
  year,
  sort,
  page,
  setPage
}) => {
  const moviesList = useSelector((state) => state.movies.list || []);
  const dispatch = useDispatch();

  const fetchDataMemoized = useMemo(() => fetchData, []);

  const handlePageChange = (pageNum) => {

    const baseUrl = `https://api.themoviedb.org/3/discover/movie`;
    const url = `${baseUrl}?include_adult=${adultInclude}&include_video=${videoInclude}&language=${language}&primary_release_year=${year}&sort_by=${sort}&page=${pageNum}`;

    fetchDataMemoized(url, movieOptions)
      .then((data) => {
        setPage(pageNum);
        dispatch(setMovies(data.results));
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <Grid container spacing={2} justifyContent="center" sx={{ padding: 2 }}>
        {moviesList.map((movie) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                height: 550,
                padding: 1,
                border: "3px solid",
                borderRadius: "0",
              }}
            >
              <CardActionArea
                component={Link}
                href={`/movie/${movie.id}`}
                underline="none"
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={`${movie.id}`}
                  sx={{
                    border: "3px solid",
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={900}
                    color={"blue"}
                  >
                    {movie.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={600}
                    color={"grey"}
                  >
                    Release date: {movie.release_date}
                  </Typography>
                  <Typography variant="body1" fontSize={11} fontWeight={800}>
                    {movie.overview}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {moviesList.length > 0 && (
        <Stack spacing={2} alignItems={"center"}>
          <Pagination
            count={500}
            color="primary"
            size="small"
            onChange={(__, pageNum) => handlePageChange(pageNum)}
          />
        </Stack>
      )}
    </>
  );
};

export default MoviesList;