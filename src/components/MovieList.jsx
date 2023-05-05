import React from "react";
import "./movieList.css";
import { useEffect, useContext } from "react";
import axios from "axios";
import Paginator from "./Paginator";
import { PopularMovieContext } from "../contexts/popularMovies";
import MovieGrid from "./MovieGrid";

const DISCOVER_MOVIE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = process.env.REACT_APP_API_KEY;
const sortBy = "popularity.desc";
const includeAdult = false;
const includeVideo = false;

export default function MovieList() {
  const {
    setPopularMovies,
    filteredMovies,
    searchActive,
    totalPage,
    setTotalPage,
    currentPage,
    setCurrentPage,
    searchTotalPage,
  } = useContext(PopularMovieContext);

  useEffect(() => {
    axios
      .get(DISCOVER_MOVIE_URL, {
        params: {
          api_key: API_KEY,
          sort_by: sortBy,
          include_adult: includeAdult,
          include_video: includeVideo,
          page: currentPage,
        },
      })
      .then((response) => {
        setPopularMovies(response.data.results);
        setTotalPage(response.data.total_pages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, setPopularMovies, setTotalPage]);

  return (
    <div className="movieList">
      <h3 className="renderGenreName">
        {searchActive ? "SEARCH MOVIES" : "POPULAR MOVIES"}
      </h3>
      <MovieGrid grid={filteredMovies} />
      <Paginator
        totalPage={searchActive ? searchTotalPage : totalPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
