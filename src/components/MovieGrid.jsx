import React from "react";
import "./movieGrid.css";
import { Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({ grid }) {
  return (
    <div className="cardWrapper">
      {grid.map((popularMovie) => (
        <div key={popularMovie.id}>
          <Link
            to={`/info/${popularMovie.id}`}
            className="cardLink"
            key={popularMovie.id}
          >
            <Card
              key={popularMovie.id}
              className="pMovieCard"
              hoverable
              cover={
                <img
                  alt="Movie"
                  src={`${IMG_URL}${popularMovie.poster_path}`}
                />
              }
            >
              <Meta
                className="pMovieCardMeta"
                title={
                  <div
                    style={{
                      whiteSpace: "normal",
                      color: "#2F4F4F",
                      fontWeight: "lighter",
                    }}
                  >
                    {popularMovie.title}
                  </div>
                }
              />
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
}
