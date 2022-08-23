import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function WeekAlbums() {
  const [albums, setAlbums] = useState([]);
  const slicedAlbums = albums.slice(0, 12);

  useEffect(() => {
    axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=dirkgaston&period=7day&api_key=${
          import.meta.env.VITE_API_KEY
        }&format=json`
      )
      .then((res) => {
        console.log(res.data.topalbums.album);
        setAlbums(res.data.topalbums.album);
      })
      .catch((err) => console.log(err));
  }, []);

  slicedAlbums.reverse();

  slicedAlbums.sort((a, b) => {
    if (a.playcount > b.playcount) return -1;
    return a.playcount < b.playcount ? 1 : 0;
  });

  return (
    <div className="cardContainer">
      {slicedAlbums.map((album, i) => (
        <Card
          key={album.mbid}
          imgUrl={album.image[3]["#text"]}
          imgTitle={`${album.artist.name} - ${album.name}`}
          imgDesc={`${album.playcount} reproducciones los últimos 7 días`}
          albumDataLink={album.url}
        />
      ))}
    </div>
  );
}

export default WeekAlbums;
