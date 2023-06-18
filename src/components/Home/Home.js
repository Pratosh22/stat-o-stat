import React, { useState, useEffect } from "react";
import { getTopArtists, getTopSongs, getRecommendations } from "../../api";
import SongCard from "../SongCard/SongCard";
import Spinner from "../Spinner/Spinner";
import "./Home.css";

function Home({ token }) {
  const [loader,setLoader]=useState(false); 
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [recom, setRecom] = useState([]);
  const [refresh,setRefresh]=useState(false);
  const [songCard,setSongCard]=useState(true);
  
  useEffect(() => {
    setLoader(true)
    const fetchData = async () => {
      try { 
        const topArtists = await getTopArtists(token,2,'short_term');
        const topSongs = await getTopSongs(token,3,'short_term');
        setArtists(topArtists);
        setSongs(topSongs);
        handleRecommendations(topArtists, topSongs);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData(); // Fetch data first
  }, [refresh]);

  const handleRecommendations = async (artists, songs) => {
    try {
      const recommendedTracks = await getRecommendations(token, artists, songs);
      setRecom(recommendedTracks);
      setLoader(false)
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const reload = () => {
    setRefresh(!refresh);
  };

  

  return (
    
    <div className="home">
      {loader && <Spinner />}
      <div className="home__title">
        <div className="title">Songs you may like...</div>
        <div className="refresh">
          <i className="fa-solid fa-arrows-rotate" onClick={reload}></i>
        </div>
      </div>
      <div className="songs__list">
        <SongCard songs={recom} state={songCard}/>
      </div>
    </div>
  );
}

export default Home;
