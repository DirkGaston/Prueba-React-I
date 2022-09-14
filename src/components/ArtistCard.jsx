import { useState, useEffect } from "react";
import axios from "axios";

const albumCard = ({ imgTitle, imgDesc, albumDataLink }) => {
  const [biography, setBiography] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${imgTitle}&api_key=${
          import.meta.env.VITE_API_KEY
        }&format=json`
      )
      .then((res) => {
        setBiography(res.data.artist.bio.summary);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 albumCard">
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {imgTitle}
        </h5>

        <p className="mb-5 mt-5 text-black  ">{biography}</p>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {imgDesc}
        </p>
        <a
          href={albumDataLink}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          target="_blank"
        >
          Detalles en Last.fm
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default albumCard;
