import React from "react";
import MovieInfo from "../components/MovieInfo";
import {} from "antd";
import Navbar from "../components/Navbar";

export default function Info() {
  return (
    <div>
      <Navbar showInput={false} />
      <MovieInfo />
    </div>
  );
}
