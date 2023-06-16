import React, { useState, useEffect } from "react";
import { getTopArtists, getTopSongs, getRecommendations } from "../../api";
import SongCard from "../SongCard/SongCard";
import "./Home.css";

function Home({ token }) {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [recom, setRecom] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const topArtists = await getTopArtists(token);
        const topSongs = await getTopSongs(token);
        setArtists(topArtists);
        setSongs(topSongs);
        handleRecommendations(topArtists, topSongs);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData(); // Fetch data first
   
  }, [token]);
 
  const handleRecommendations = async (artists, songs) => {
    try {
      const recommendedTracks = await getRecommendations(token, artists, songs);
      setRecom(recommendedTracks);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className="home__title">Songs you may like...</div>
      <div className="songs__list">
            <SongCard songs={recom}/>
      </div>
    </div>
  );
}

export default Home;
