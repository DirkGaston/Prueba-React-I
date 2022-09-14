import WeekAlbums from "../components/WeekAlbums";
import WeekArtists from "../components/WeekArtists";
import WeekSongs from "../components/WeekSongs";
import { useState, useEffect } from "react";

const Music = () => {
  return (
    <div className="musicContainer">
      <div id="musicNav">
        <a href="#artists">
          <h4>Artistas</h4>
        </a>
        <a href="#albums">
          <h4>Álbums</h4>
        </a>{" "}
        <a href="#songs">
          <h4>Temas</h4>
        </a>
      </div>
      <div className="pageDesc">
        <p>La música que he escuchado en los últimos 7 días.</p>
      </div>

      <div id="artists">
        <WeekArtists />
      </div>
      <div id="albums">
        <WeekAlbums />
      </div>
      <div id="songs">
        <WeekSongs />
      </div>
    </div>
  );
};

export default Music;
