import React from "react";
import "./navbar.css";
import { MenuOutlined, HomeFilled, PlayCircleFilled } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GenreNameContext } from "../contexts/genresName";
import SearchBar from "./SearchBar";
import { PopularMovieContext } from "../contexts/popularMovies";

const API_KEY = process.env.REACT_APP_API_KEY;
const GENRE_LIST_URL = "https://api.themoviedb.org/3/genre/movie/list?";

export default function Navbar({ showInput = true }) {

  //抽屜開關
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { setGenreSort, genres, setGenres } = useContext(GenreNameContext);
  const { setSearchTotalPage, setSearchActive, totalPage, setCurrentPage } =
    useContext(PopularMovieContext);

  //獲取genres列表
  useEffect(() => {
    axios
      .get(GENRE_LIST_URL, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="navbar">
      {showInput && <SearchBar />}
      <Button className="sideSheet" onClick={showDrawer}>
        <MenuOutlined className="menuIcon" />
      </Button>

      <Drawer
        style={{ backgroundColor: "#f5f5f5" }}
        className="drawer"
        placement="left"
        onClose={onClose}
        open={open}
        width="300px"
      >
        <ul className="genresList">
          <div className="drawerList">HOME</div>
          <Link to="/" onClick={() => setCurrentPage(1)}>
            <li className="genresInfo">
              <HomeFilled />
              <span className="drawerText">Home Page</span>
            </li>
          </Link>
          <hr />
          <div className="drawerList">GENRES</div>
          {genres &&
            genres.map((genre) => (
              <Link
                to={`/genre/${genre.id}`}
                key={genre.id}
                onClick={() => {
                  setOpen(false);
                  setSearchActive(false);
                  setSearchTotalPage(totalPage);
                  setCurrentPage(1);
                }}
              >
                <li
                  className="genresInfo"
                  key={genre.id}
                  onClick={() => setGenreSort(genre.name.toUpperCase())}
                >
                  <PlayCircleFilled />
                  <span className="drawerText">{genre.name}</span>
                </li>
              </Link>
            ))}
        </ul>
      </Drawer>

      <div className="computerNavbar">
        <ul className="genresList">
          <div className="drawerList">HOME</div>
          <Link
            to="/"
            className="noTextDecoration"
            onClick={() => setCurrentPage(1)}
          >
            <li className="genresInfo">
              <HomeFilled />
              <span className="drawerText">Home Page</span>
            </li>
          </Link>
          <hr />
          <div className="drawerList">GENRES</div>
          {genres &&
            genres.map((genre) => (
              <Link
                to={`/genre/${genre.id}`}
                className="noTextDecoration"
                key={genre.id}
                onClick={() => {
                  setOpen(false);
                  setSearchActive(false);
                  setSearchTotalPage(totalPage);
                  setCurrentPage(1);
                }}
              >
                {window.scrollTo({ top: 0, behavior: "smooth" })}
                <li
                  className="genresInfo"
                  key={genre.id}
                  onClick={() => setGenreSort(genre.name.toUpperCase())}
                >
                  <PlayCircleFilled />
                  <span className="drawerText">{genre.name}</span>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}
