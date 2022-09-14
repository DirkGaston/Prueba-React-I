import { useState, useEffect } from "react";
import axios from "axios";

function WeekSongs() {
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function sortTrackTitleAsc() {
    const sortedData = [...tracks].sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    setTracks(sortedData);
  }

  function sortTrackTitleDsc() {
    const sortedData = [...tracks].sort((a, b) => {
      return a.name < b.name ? 1 : -1;
    });
    setTracks(sortedData);
  }

  function sortArtistNameAsc() {
    const sortedData = [...tracks].sort((a, b) => {
      return a.artist.name > b.artist.name ? 1 : -1;
    });
    setTracks(sortedData);
  }

  function sortArtistNameDsc() {
    const sortedData = [...tracks].sort((a, b) => {
      return a.artist.name < b.artist.name ? 1 : -1;
    });
    setTracks(sortedData);
  }

  function sortPlaycountAsc() {
    const sortedData = [...tracks].sort((a, b) => {
      if (a.playcount === Infinity) return 1;
      else if (isNaN(a.playcount)) return -1;
      else return a.playcount - b.playcount;
    });
    setTracks(sortedData);
  }

  function sortPlaycountDsc() {
    const sortedData = [...tracks].sort((a, b) => {
      if (a.playcount === Infinity) return 1;
      else if (isNaN(a.playcount)) return -1;
      else return b.playcount - a.playcount;
    });
    setTracks(sortedData);
  }

  const inputValue = (search) => {
    setSearchTerm(search);
  };

  useEffect(() => {
    axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=dirkgaston&period=7day&api_key=${
          import.meta.env.VITE_API_KEY
        }&format=json`
      )
      .then((res) => {
        setTracks(res.data.toptracks.track);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-7xl my-5">🎵 Temas 🎵 </h1>
      <div className="searchBarContainer">
        <form>
          <label htmlFor="searchText">Buscar Tema</label>
          <input
            className="searchBar"
            id="searchText"
            type="text"
            placeholder="Nombre tema o artista..."
            required
            onChange={(e) => {
              inputValue(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="sortBtnContainer">
        <button className="sortBtn" onClick={sortTrackTitleAsc}>
          Ordenar por Tema A-Z
        </button>
        <button className="sortBtn" onClick={sortTrackTitleDsc}>
          Ordenar por Tema Z-A
        </button>
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
      <div className="tracksContainer">
        <div className="trackList">
          <h2 className="mb-2 mt-10 text-white text-lg font-semibold text-gray-900 dark:text-white">
            Las más escuchadas de los últimos siete días
          </h2>
          <ol className="space-y-1 list-decimal list-inside text-white dark:text-gray-400">
            {tracks
              .filter(
                (track) =>
                  track.artist.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  track.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((track, i) => (
                <li>
                  {track.artist.name} - {track.name} ({track.playcount} veces)
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default WeekSongs;
