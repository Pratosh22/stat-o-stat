import React, { useEffect, useState } from "react";
import { getPlaylist, getTracks, unfollowPlaylist } from "../../api";
import Spinner from "../Spinner/Spinner";
import TrackList from "../TrackList/TrackList";
import "./PlayList.css";

function PlayList({ token, id }) {
  const [loader, setLoader] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [visiblePlaylists, setVisiblePlaylists] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const [hoveredPlaylist, setHoveredPlaylist] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [tracksLoader, setTracksLoader] = useState(false);
  const [showBinIcon, setShowBinIcon] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const response = await getPlaylist(token, id);
        const fetchedPlaylists = response.items;
        setPlaylists(fetchedPlaylists);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setPlaylists([]);
        setLoader(false);
      }
    };
    fetchData();
  }, [token, id]);

  useEffect(() => {
    if (playlists.length > 0) {
      const filteredPlaylists = playlists.filter(
        (item) => item.tracks.total > 0
      );
      setVisiblePlaylists(filteredPlaylists.slice(0, 10));
      if (filteredPlaylists.length > 10) {
        setShowMore(true);
      }
    }
  }, [playlists]);

  const handleShowMore = () => {
    const visibleCount = visiblePlaylists.length;
    const nextVisibleCount = visibleCount + 10;
    const nextVisiblePlaylists = playlists
      .slice(0, nextVisibleCount)
      .filter((item) => item.tracks.total > 0);
    setVisiblePlaylists(nextVisiblePlaylists);
    if (nextVisibleCount >= playlists.length) {
      setShowMore(false);
    }
    setShowLess(true);
  };

  const handleShowLess = () => {
    const filteredPlaylists = playlists.filter((item) => item.tracks.total > 0);
    setVisiblePlaylists(filteredPlaylists.slice(0, 10));
    setShowMore(true);
    setShowLess(false);
  };

  const handlePlaylistHover = (playlistId) => {
    setHoveredPlaylist(playlistId);
  };

  const handlePlaylistHoverLeave = () => {
    setHoveredPlaylist(null);
  };

  const handlePlaylistClick = async (playlistId) => {
    setSelectedPlaylist(playlistId);
    setTracksLoader(true);
    try {
      const response = await getTracks(token, playlistId);
      const fetchedTracks = response;
      setTracks(fetchedTracks);
      setTracksLoader(false);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setTracks([]);
      setTracksLoader(false);
    }
  };

  const handleBackButtonClick = () => {
    setSelectedPlaylist(null);
    setTracks([]);
  };

  const handleDeletePlaylist = async (playlistId) => {
    setLoader(true);
    try {
      const res = await unfollowPlaylist(token, playlistId);
      //if response is empty then playlist is deleted
      if (Object.keys(res).length === 0) {
        alert("Playlist deleted successfully");
        setLoader(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
    console.log(`Deleting playlist with ID: ${playlistId}`);
  };

  return (
    <>
      {loader && <Spinner />}
      {tracksLoader && <Spinner />}
      <hr style={{ width: "100%" }} />
      {tracks.length === 0 && (
        <div className="playlist__title">
          Your Playlists...
          <div className="show__button">
            {showMore && (
              <button onClick={handleShowMore} className="show-more-button">
                <i className="fa-solid fa-plus"></i>
                Show More
              </button>
            )}
            {showLess && (
              <button onClick={handleShowLess} className="show-less-button">
                <i className="fa-solid fa-minus"></i>
                Show Less
              </button>
            )}
          </div>
        </div>
      )}
      {tracks.length === 0 ? (
        <div className="playlist">
          {Array.isArray(visiblePlaylists) && visiblePlaylists.length > 0 ? (
            visiblePlaylists.map((item) => (
              <div
                className={`playlist__item card ${
                  hoveredPlaylist === item.id ? "hovered" : ""
                }`}
                key={item.id}
                onMouseEnter={() => handlePlaylistHover(item.id)}
                onMouseLeave={handlePlaylistHoverLeave}
                onClick={() => handlePlaylistClick(item.id)}
              >
                {item.images && item.images.length > 0 && (
                  <img src={item.images[0].url} alt="playlist" />
                )}
                <h5>{item.name}</h5>
                {hoveredPlaylist === item.id && (
                  <div className="edit-icons">
                    <div className="edit-icon">
                      <i className="fa-solid fa-lg fa-pen-to-square"></i>
                    </div>
                    <div
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePlaylist(item.id);
                      }}
                    >
                      <i className="fa-solid fa-lg fa-trash"></i>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No playlists available.</p>
          )}
        </div>
      ) : (
        <div>
          <button onClick={handleBackButtonClick} className="back">
            <i className="fa-solid fa-arrow-left"></i>Back
          </button>
          <TrackList tracks={tracks} id={selectedPlaylist}/>
        </div>
      )}
    </>
  );
}

export default PlayList;
