import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./AlbumCard";

function WeekAlbums() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const slicedAlbums = albums.slice(0, 30);

  function sortAlbumTitleAsc() {
    const sortedData = [...albums].sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    setAlbums(sortedData);
  }

  function sortAlbumTitleDsc() {
    const sortedData = [...albums].sort((a, b) => {
      return a.name < b.name ? 1 : -1;
    });
    setAlbums(sortedData);
  }

  function sortArtistNameAsc() {
    const sortedData = [...albums].sort((a, b) => {
      return a.artist.name > b.artist.name ? 1 : -1;
    });
    setAlbums(sortedData);
  }

  function sortArtistNameDsc() {
    const sortedData = [...albums].sort((a, b) => {
      return a.artist.name < b.artist.name ? 1 : -1;
    });
    setAlbums(sortedData);
  }

  function sortPlaycountAsc() {
    const sortedData = [...albums].sort((a, b) => {
      if (a.playcount === Infinity) return 1;
      else if (isNaN(a.playcount)) return -1;
      else return a.playcount - b.playcount;
    });
    setAlbums(sortedData);
  }

  function sortPlaycountDsc() {
    const sortedData = [...albums].sort((a, b) => {
      if (a.playcount === Infinity) return 1;
      else if (isNaN(a.playcount)) return -1;
      else return b.playcount - a.playcount;
    });
    setAlbums(sortedData);
  }

  const inputValue = (search) => {
    setSearchTerm(search);
  };

  useEffect(() => {
    axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=dirkgaston&period=7day&api_key=${
          import.meta.env.VITE_API_KEY
        }&format=json`
      )
      .then((res) => {
        setAlbums(res.data.topalbums.album);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-7xl my-5">💿 Álbums 💿 </h1>
      <div className="searchBarContainer">
        <form>
          <label htmlFor="searchText">Buscar Álbum</label>
          <input
            className="searchBar"
            id="searchText"
            type="text"
            placeholder="Nombre álbum o artista..."
            required
            onChange={(e) => {
              inputValue(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="sortBtnContainer">
        <button className="sortBtn" onClick={sortAlbumTitleAsc}>
          Ordenar por Álbum A-Z
        </button>
        <button className="sortBtn" onClick={sortAlbumTitleDsc}>
          Ordenar por Álbum Z-A
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
      <div className="cardContainer">
        {slicedAlbums
          .filter(
            (album) =>
              album.artist.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              album.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((album, i) => (
            <Card
              key={i}
              imgUrl={album.image[3]["#text"]}
              imgTitle={`${album.artist.name} - ${album.name}`}
              imgDesc={`${album.playcount} reproducciones los últimos 7 días`}
              albumDataLink={album.url}
            />
          ))}
      </div>
    </div>
  );
}

export default WeekAlbums;
