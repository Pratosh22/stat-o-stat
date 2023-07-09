import React, { useState, useEffect } from 'react';
import { getTopArtists } from '../../api';
import Spinner from '../Spinner/Spinner';
import './ArtistCard.css';

function ArtistCard({ token, state,responsive }) {
  const [artists, setArtists] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const topArtists = await getTopArtists(token, 10, state);
        setArtists(topArtists);
        setLoader(false);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };
    fetchData();
  }, [state, token]);
  let visibility=responsive;
  return (
    <div className="artist">
      {loader ? (
        <Spinner />
      ) : (
        <>
          {artists.length === 0 ? (
            <div className="no-data-message">Not enough data to render artists.</div>
          ) : (
            artists.map((artist) => (
              <div className="card" key={artist.id}>
                <img src={artist.images[0].url} alt="artist" />
                <div className={visibility ? "title" : "title responsive__title"}>{artist.name}</div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default ArtistCard;
