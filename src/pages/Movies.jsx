import { useState, useEffect } from "react";
import FilmCard from "../components/FilmCard";

const Movies = () => {
  const [Films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const inputValue = (search) => {
    setSearchTerm(search);
  };

  const getData = () => {
    fetch("films.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setFilms(myJson.items);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="movieContainer">
      <h1 className="text-7xl my-5">🎥 Películas 🎥</h1>
      <div className="pageDesc">
        <p>Las últimas 25 películas que he visto</p>
      </div>
      <div className="searchBarContainer">
        <form>
          <label htmlFor="searchText">Buscar Película</label>
          <input
            className="searchBar"
            id="searchText"
            type="text"
            placeholder="Título u año..."
            required
            onChange={(e) => {
              inputValue(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="cardContainer">
        {Films.slice(0, 25)
          .filter(
            (film) =>
              film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              film.content_html.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((film, i) => (
            <FilmCard
              key={i}
              htmlContent={film.content_html}
              title={film.title}
              imdbUrl={film.imdbUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default Movies;
