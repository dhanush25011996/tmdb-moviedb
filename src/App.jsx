import React, { useState } from "react";
import "./App.css";
import { Stack, Typography } from "@mui/material";
import SearchMovies from "./components/SearchMovies";
import MoviesList from "./components/MoviesList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue, lightGreen } from "@mui/material/colors/";

const App = () => {
  const [adultInclude, setAdultInclude] = useState(false);
  const [videoInclude, setVideoInclude] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [page, setPage] = useState(1);
  const [year, setYear] = useState("");
  const [sort] = useState("popularity.desc");

  const theme = createTheme({
    palette: {
      primary: lightBlue,
      secondary: lightGreen,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction={"column"}
        sx={{
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <Typography
          variant="h1"
          align="center"
          fontFamily={"fantasy"}
          textTransform={"uppercase"}
          sx={{ fontSize: { xs: "60px" } }}
        >
          Movie Database
        </Typography>
        <SearchMovies
          adultInclude={adultInclude}
          setAdultInclude={setAdultInclude}
          videoInclude={videoInclude}
          setVideoInclude={setVideoInclude}
          language={language}
          setLanguage={setLanguage}
          year={year}
          setYear={setYear}
          sort={sort}
        />
        <MoviesList
          adultInclude={adultInclude}
          setAdultInclude={setAdultInclude}
          videoInclude={videoInclude}
          setVideoInclude={setVideoInclude}
          language={language}
          setLanguage={setLanguage}
          year={year}
          setYear={setYear}
          sort={sort}
          page={page}
          setPage={setPage}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default App;
