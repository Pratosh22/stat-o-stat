import React, { useState, useEffect } from "react";
import { getTopArtists, getTopSongs, getRecommendations } from "../../api";
import SongCard from "../SongCard/SongCard";
import Spinner from "../Spinner/Spinner";
import "./Home.css";
import { createPlaylist, addTracksToPlaylist } from "../../api";

function Home({ token, id }) {
  const [loader, setLoader] = useState(false);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [recom, setRecom] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [songCard, setSongCard] = useState(true);
  const [uris, setUris] = useState([]);
  const user_id = id;
  const auth_token = token;

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const topArtists = await getTopArtists(token, 2, "short_term");
        const topSongs = await getTopSongs(token, 3, "short_term");
        setArtists(topArtists);
        setSongs(topSongs);
        if (topArtists.length === 0 || topSongs.length === 0) {
          setLoader(false);
          setSongCard(false);
        } else {
          handleRecommendations(topArtists, topSongs);
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleRecommendations = async (artists, songs) => {
    try {
      const recommendedTracks = await getRecommendations(token, artists, songs);
      setRecom(recommendedTracks);
      setUris(recommendedTracks.map((track) => track.uri));
      setLoader(false);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const reload = () => {
    setRefresh(!refresh);
  };

  const handlePlaylistCreation = async () => {
    setLoader(true);
    try {
      const response = await createPlaylist(
        auth_token,
        user_id,
        "recommendationPlaylist",
        "A playlist curated by your recommendation"
      );
      const playlist_id = response.id;
      const addTracks = await addTracksToPlaylist(auth_token, playlist_id, uris);
      setLoader(false);
      alert("Playlist created successfully");
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div className="home">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <div className="home__title">
            <div className="title">Songs you may like...</div>
            <div className="refresh">
              <i className="fa-solid fa-arrows-rotate" onClick={reload}></i>
            </div>
          </div>
          {songCard ? (
            <div className="songs__list">
              <SongCard songs={recom} state={songCard} />
            </div>
          ) : (
            <div className="no-data-message">
              Not enough data to render recommendations.
            </div>
          )}
          <div className="create__playlist">
            <button
              className="create__playlist__button"
              onClick={handlePlaylistCreation}
              disabled={loader}
            >
              <i className="fa-solid fa-plus"></i>
              Create Playlist
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
