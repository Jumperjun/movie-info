import React, { createContext } from "react";
import { useState } from "react";

export const GenreNameContext = createContext();

export default function GenresNameProvider({ children }) {
  const [genreSort, setGenreSort] = useState("");
  const [genres, setGenres] = useState([]);

  return (
    <GenreNameContext.Provider
      value={{ genreSort, setGenreSort, genres, setGenres }}
    >
      {children}
    </GenreNameContext.Provider>
  );
}
