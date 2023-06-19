import React, { useEffect, useState } from 'react';
import './SongStat.css';
import { getTopSongs } from '../../../api';
import SongCard from '../../SongCard/SongCard';
import Spinner from '../../Spinner/Spinner';

function SongStat({ token, state, setHasData }) {
  const [loader, setLoader] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      const topSongs = await getTopSongs(token, 10, state);
      setSongs(topSongs);
      setLoader(false);
      if (topSongs.length === 0) {
        setHasData(false);
      } else {
        setHasData(true);
      }
    };
    fetchData();
  }, [token, state, setHasData]);

  return (
    <div className="song__stats">
      {loader ? <Spinner /> : <SongCard songs={songs} />}
    </div>
  );
}

export default SongStat;
