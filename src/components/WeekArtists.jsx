import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./ArtistCard";

function WeekArtists() {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const slicedArtists = artists.slice(0, 25);

  function sortArtistNameAsc() {
    const sortedData = [...artists].sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    setArtists(sortedData);
  }

  function sortArtistNameDsc() {
    const sortedData = [...artists].sort((a, b) => {
      return a.name < b.name ? 1 : -1;
    });
    setArtists(sortedData);
  }

  function sortPlaycountAsc() {
    const sortedData = [...artists].sort((a, b) => {
      if (a.playcount === Infinity) return 1;
      else if (isNaN(a.playcount)) return -1;
      else return a.playcount - b.playcount;
    });
    setArtists(sortedData);
  }

  function sortPlaycountDsc() {
    const sortedData = [...artists].sort((a, b) => {
      if (a.playcount === Infinity) return 1;
      else if (isNaN(a.playcount)) return -1;
      else return b.playcount - a.playcount;
    });
    setArtists(sortedData);
  }

  const inputValue = (search) => {
    setSearchTerm(search);
  };

  useEffect(() => {
    axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=dirkgaston&period=7day&api_key=${
          import.meta.env.VITE_API_KEY
        }&format=json`
      )
      .then((res) => {
        setArtists(res.data.topartists.artist);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-7xl my-5 artistsTitle">👨‍🎤 Artistas 👩‍🎤 </h1>
      <div className="searchBarContainer">
        <form>
          <label htmlFor="searchText">Buscar Artista</label>
          <input
            className="searchBar"
            id="searchText"
            type="text"
            placeholder="Nombre artista..."
            required
            onChange={(e) => {
              inputValue(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="sortBtnContainer">
        <button className="sortBtn" onClick={sortArtistNameAsc}>
          Ordenar por Artista A-Z
        </button>
        <button className="sortBtn" onClick={sortArtistNameDsc}>
          Ordenar por Artista Z-A
        </button>
        <button className="sortBtn" onClick={sortPlaycountAsc}>
          Ordenar por Reproducciones ASC
        </button>
        <button className="sortBtn" onClick={sortPlaycountDsc}>
          Ordenar por Reproducciones DESC
        </button>
      </div>
      <div className="cardContainer">
        {slicedArtists
          .filter((artist) =>
            artist.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((artist) => (
            <Card
              key={artist.name}
              bio={artist.summary}
              imgTitle={`${artist.name}`}
              imgDesc={`${artist.playcount} reproducciones los últimos 7 días`}
              albumDataLink={artist.url}
            />
          ))}
      </div>
    </div>
  );
}

export default WeekArtists;
