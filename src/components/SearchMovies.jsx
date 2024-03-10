import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setMovies } from "../redux/movieSlice";
import { fetchData, movieOptions } from "../utils/fetchData";

const SearchMovies = ({
  adultInclude,
  setAdultInclude,
  videoInclude,
  setVideoInclude,
  language,
  setLanguage,
  year,
  setYear,
  sort,
}) => {
  const dispatch = useDispatch();

  const handleFormSubmit = () => {
    const baseUrl = `https://api.themoviedb.org/3/discover/movie`;
    const url = `${baseUrl}?include_adult=${adultInclude}&include_video=${videoInclude}&language=${language}&primary_release_year=${year}&sort_by=${sort}`;

    fetchData(url, movieOptions)
      .then((data) => {
        dispatch(setMovies(data.results));
      })
      .catch((error) => console.error("Error:", error));
  };

  const languageOptions = [
    { label: "English", value: "en-US" },
    { label: "Spanish", value: "es-ES" },
    { label: "French", value: "fr-FR" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, index) => currentYear - index
  );

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: {lg:400, xs:"auto"},
          margin: "auto",
          padding: 5,
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);",
          borderRadius: 0,
          border: "3px solid",
          boxShadow: "3px 3px",
        }}
      >
        <Stack direction={"column"}>
          <form>
            <Stack direction={"column"}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="adult-include-label">Adult Include</InputLabel>
                <Select
                  labelId="adult-include-label"
                  id="adult-include"
                  value={adultInclude}
                  label="Adult Include"
                  onChange={(e) => setAdultInclude(e.target.value)}
                  sx={{ borderRadius: "0" }}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="video-include-label">Video Include</InputLabel>
                <Select
                  labelId="video-include-label"
                  id="video-include"
                  value={videoInclude}
                  label="Video Include"
                  onChange={(e) => setVideoInclude(e.target.value)}
                  sx={{ borderRadius: "0" }}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="year-label" sx={{ mb: 1 }}>
                  Year
                </InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  value={year}
                  label="Year"
                  onChange={(e) => setYear(e.target.value)}
                  sx={{ borderRadius: "0" }}
                >
                  {years.map((yearOption) => (
                    <MenuItem key={yearOption} value={yearOption}>
                      {yearOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  value={language}
                  label="Language"
                  onChange={(e) => setLanguage(e.target.value)}
                  sx={{ borderRadius: "0" }}
                >
                  {languageOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="filled"
                onClick={handleFormSubmit}
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  borderRadius: "0",
                  border: "2px solid",
                  boxShadow: "2px 2px",
                }}
                endIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </>
  );
};

export default SearchMovies;
