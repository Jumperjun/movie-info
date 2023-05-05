import React from "react";
import "./movieInfo.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Rate } from "antd";
import {
  PushpinFilled,
  LinkOutlined,
  GlobalOutlined,
  CaretRightFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PopularMovieContext } from "../contexts/popularMovies";

const MOVIE_DETAIL_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = process.env.REACT_APP_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const IMDB_URL = "https://www.imdb.com/title/";
const TRAILER_DETAIL_URL = "https://api.themoviedb.org/3/movie/";
const YOUTUBE_URL = "https://www.youtube.com/embed/";

export default function MovieInfo() {
  const { movieId } = useParams();
  const [info, setInfo] = useState({});
  const [trailer, setTrailer] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const { filteredMovies, setSearchActive, setCurrentPage} = useContext(PopularMovieContext);

  // 獲取電影詳細資訊
  useEffect(() => {
    axios
      .get(`${MOVIE_DETAIL_URL}${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => console.error(error));
  }, [movieId, filteredMovies]);

  // 獲取電影預告片資訊
  useEffect(() => {
    axios
      .get(`${TRAILER_DETAIL_URL}${movieId}/videos?`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((response) => {
        setTrailer(response.data.results[0]);
      })
      .catch((error) => console.error(error));
  }, [movieId]);

  const scrollToTop = () => {
    setSearchActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="infoContainer">
      <div className="infoWrapper">
        <div className="imgWrapper">
          {info.poster_path && (
            <img
              className="infoImg"
              src={`${IMG_URL}${info.poster_path}`}
              alt="MOVIE"
            />
          )}
        </div>
        <div className="textWrapper">
          <div className="movieName">{info.title}</div>

          <div className="rateAndRelease">
            {info.vote_average && (
              <Rate
                className="rateStar"
                allowHalf
                disabled
                defaultValue={info.vote_average / 1.8}
              />
            )}
            <span className="release">
              {info.runtime}MIN./{info.release_date}
            </span>
          </div>

          <div className="genresTitle">THE GENRES</div>
          <div className="genres">
            {info.genres &&
              info.genres.map((genre) => (
                <span key={genre.id} className="genreItem">
                  <PushpinFilled className="genreIcon" />
                  {genre.name.toUpperCase()}
                </span>
              ))}
          </div>
          <br />
          <div className="overviewTitle">OVERVIEW</div>
          <div className="overview">{info.overview}</div>
          <div className="infoLink">
            <a
              href={info.homepage}
              className="linkWebsite"
              target="_blank"
              rel="noopener noreferrer"
            >
              WEBSITE
              <LinkOutlined className="infoLInkIcon" />
            </a>

            <a
              href={`${IMDB_URL}${info.imdb_id}`}
              className="linkWebsite"
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDB
              <GlobalOutlined className="infoLInkIcon" />
            </a>

            <div
              className="linkWebsite"
              onClick={() => setShowTrailer(!showTrailer)}
            >
              TRAILER
              <CaretRightFilled className="infoLInkIcon" />
            </div>
          </div>
        </div>
      </div>

      {showTrailer && (
        <div className="videoBox">
          <iframe
            src={`${YOUTUBE_URL}${trailer.key}`}
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
        </div>
      )}
      <Link to="/" onClick={()=>setCurrentPage(1)}>
        <button className="back" onClick={scrollToTop}>
          <ArrowLeftOutlined className="backIcon" />
          BACK
        </button>
      </Link>
    </div>
  );
}
