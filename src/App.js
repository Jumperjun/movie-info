import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home"
import Info from "./pages/info"
import GenreMovies from "./components/GenreMovies";
import GenresNameProvider from "./contexts/genresName"
import PopularMoviesProvider from "./contexts/popularMovies"

function App() {
  return (
  <div className="App">
    <PopularMoviesProvider>
    <GenresNameProvider>
    <BrowserRouter>
     <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genre/:genreId" element={<GenreMovies />} />
          <Route path="/info/:movieId" element={<Info />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
    </GenresNameProvider>
    </PopularMoviesProvider>
  </div>
  )
}

export default App;
