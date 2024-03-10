import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    list: [],
    selectedMovie: null,
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setSelectedMovies: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setMovies, setSelectedMovies } = movieSlice.actions;
export const selectMovies = (state) => state.movies;
export default movieSlice.reducer;
