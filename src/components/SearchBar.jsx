import React from "react";
import { useState, useContext, useEffect } from "react";
import "./searchBar.css";
import { SearchOutlined } from "@ant-design/icons";
import { PopularMovieContext } from "../contexts/popularMovies";
import axios from "axios";

const DISCOVER_MOVIE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = process.env.REACT_APP_API_KEY;
const sortBy = "popularity.desc";
const includeAdult = false;
const includeVideo = false;

export default function SearchBar() {
  const {
    setFilteredMovies,
    popularMovies,
    setSearchActive,
    setSearchTotalPage,
    totalPage,
  } = useContext(PopularMovieContext);
  const [searchChange, setSearchChange] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setFilteredMovies(popularMovies);
  }, [popularMovies, setFilteredMovies, totalPage]);

  // 獲取電影資料
  const fetchMoviesBySearch = async () => {
    const fetchedMovies = [];

    for (let i = 1; i <= 20; i++) {
      try {
        const response = await axios.get(DISCOVER_MOVIE_URL, {
          params: {
            api_key: API_KEY,
            sort_by: sortBy,
            include_adult: includeAdult,
            include_video: includeVideo,
            page: i,
          },
        });

        fetchedMovies.push(...response.data.results);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    return fetchedMovies;
  };

  // 搜尋欄輸入值變更時調用
  const inputChange = async (event) => {
    const searchValue = event.target.value.trim().toLowerCase();

    // 如果輸入值為空，顯示熱門電影，隱藏搜尋結果，並清空搜尋欄值
    if (searchValue.length === 0) {
      setFilteredMovies(popularMovies);
      setSearchActive(false);
      setInputValue(searchValue);
      return;
    }

    // 如果輸入值有內容，顯示搜尋結果，隱藏熱門電影
    if (searchValue.length > 0) {
      const fetchedMovies = await fetchMoviesBySearch();
      const newFilterMovies = fetchedMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchValue)
      );
      setSearchTotalPage(Math.ceil(newFilterMovies.length / 20));
      setFilteredMovies(newFilterMovies);
      setSearchActive(true);

      // 如果搜尋結果為空，提示使用者找不到，顯示熱門電影，隱藏搜尋結果，清空搜尋欄值
      if (newFilterMovies.length === 0) {
        alert(`Can't find movies of "${searchValue}"`);
        setInputValue("");
        setFilteredMovies(popularMovies);
        setSearchActive(false);
      }
    } else {
      // 顯示總頁數為所有搜尋結果總頁數
      setSearchTotalPage(totalPage);
    }
  };

  return (
    <div>
      {searchChange ? (
        <SearchOutlined
          className="searchIcon"
          onClick={() => setSearchChange(false)}
        />
      ) : (
        <div className="inputWrapper">
          <input
            type="text"
            placeholder="search movie..."
            id="movieInput"
            onKeyUp={inputChange}
          />
        </div>
      )}
    </div>
  );
}
