import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function WeekArtists() {
  const [artists, setArtists] = useState([]);
  const slicedArtists = artists.slice(0, 12);

  useEffect(() => {
    axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=dirkgaston&period=7day&api_key=${
          import.meta.env.VITE_API_KEY
        }&format=json`
      )
      .then((res) => {
        console.log(res.data.topartists.artist);
        setArtists(res.data.topartists.artist);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="cardContainer">
      {slicedArtists.map((artist, i) => (
        <Card
          key={artist.name}
          imgUrl={artist.image[4]["#text"]}
          imgTitle={`${artist.name}`}
          imgDesc={`${artist.playcount} reproducciones los últimos 7 días`}
          albumDataLink={artist.url}
        />
      ))}
    </div>
  );
}

export default WeekArtists;
