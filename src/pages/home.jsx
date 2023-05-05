import React from "react";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import "./home.css";

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <MovieList />
    </div>
  );
}
