export const movieOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${
        import.meta.env.VITE_REACT_APP_MOVIE_KEY || process.env.VITE_REACT_APP_MOVIE_KEY
      }`,
    },
  };
  
  export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
  
    return data;
  };
  