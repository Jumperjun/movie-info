import React from "react";
import "./genreMovies.css";
import { useEffect, useContext } from "react";
import axios from "axios";
import Paginator from "./Paginator";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { GenreNameContext } from "../contexts/genresName";
import MovieGrid from "./MovieGrid";
import { PopularMovieContext } from "../contexts/popularMovies";

const DISCOVER_MOVIE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = process.env.REACT_APP_API_KEY;
const sortBy = "popularity.desc";
const includeAdult = false;
const includeVideo = false;

export default function GenreMovies() {
  const {
    popularMovies,
    filteredMovies,
    setPopularMovies,
    searchActive,
    totalPage,
    setTotalPage,
    currentPage,
    setCurrentPage,
    searchTotalPage,
  } = useContext(PopularMovieContext);

  const { genreId } = useParams();
  const { genreSort, setGenreSort, genres, setGenres } =
    useContext(GenreNameContext);
 
  //獲取genres類別電影列表
  useEffect(() => {
    axios
      .get(DISCOVER_MOVIE_URL, {
        params: {
          api_key: API_KEY,
          sort_by: sortBy,
          include_adult: includeAdult,
          include_video: includeVideo,
          with_genres: genreId,
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
  }, [currentPage, genreId, setPopularMovies]);

  //根據genres類別改變標題
  useEffect(() => {
    const fetchGenreName = () => {
      if (!genres || genres.length === 0) {
        axios
          .get("https://api.themoviedb.org/3/genre/movie/list", {
            params: {
              api_key: API_KEY,
            },
          })
          .then((response) => {
            const fetchedGenres = response.data.genres;
            const genre = fetchedGenres.find((g) => g.id === parseInt(genreId));
            if (genre) {
              setGenreSort(genre.name.toUpperCase());
            }
            setGenres(fetchedGenres);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const genre = genres.find((g) => g.id === parseInt(genreId));
        if (genre) {
          setGenreSort(genre.name.toUpperCase());
        }
      }
    };
    fetchGenreName();
  }, [genreId, setGenreSort]);

  return (
    <div className="movieList">
      <Navbar />
      <h3 className="renderGenreName">
        {searchActive ? "SEARCH MOVIES" : `${genreSort} MOVIES`}
      </h3>
      <MovieGrid grid={searchActive ? filteredMovies : popularMovies} />
      <Paginator
        totalPage={searchActive ? searchTotalPage : totalPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
