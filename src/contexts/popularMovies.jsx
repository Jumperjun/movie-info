import React, { createContext } from "react";
import { useState } from "react";

export const PopularMovieContext = createContext();

export default function PopularMoviesProvider({ children }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTotalPage, setSearchTotalPage] = useState(0);

  return (
    <PopularMovieContext.Provider
      value={{
        popularMovies,
        setPopularMovies,
        filteredMovies,
        setFilteredMovies,
        searchActive,
        setSearchActive,
        totalPage,
        setTotalPage,
        currentPage,
        setCurrentPage,
        searchTotalPage,
        setSearchTotalPage,
      }}
    >
      {children}
    </PopularMovieContext.Provider>
  );
}
