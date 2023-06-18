import React, { useEffect, useState } from "react";
import { getPlaylist } from "../../api";
import Spinner from "../Spinner/Spinner";
import "./PlayList.css";

function PlayList({ token, id }) {
  const [loader, setLoader] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [visiblePlaylists, setVisiblePlaylists] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);

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
    setVisiblePlaylists(
      playlists.slice(0, 10).filter((item) => item.tracks.total > 0)
    );
    setShowMore(true);
    setShowLess(false);
  };

  return (
    <div>
      {loader && <Spinner />}
      <hr style={{ width: "100%" }} />
      <div className="playlist__title">
        Your Playlists...
        <div className="show__button">
          {showMore && (
            <button onClick={handleShowMore} className="show-more-button">
              <i class="fa-solid fa-plus"></i>
              Show More
            </button>
          )}
          {showLess && (
            <button onClick={handleShowLess} className="show-less-button">
              <i class="fa-solid fa-minus"></i>
              Show Less
            </button>
          )}
        </div>
      </div>
      <div className="playlist">
        {Array.isArray(visiblePlaylists) && visiblePlaylists.length > 0 ? (
          visiblePlaylists.map((item) => (
            <div className="playlist__item card" key={item.id}>
              {item.images && item.images.length > 0 && (
                <img src={item.images[0].url} alt="playlist" />
              )}
              <h5>{item.name}</h5>
            </div>
          ))
        ) : (
          <p>No playlists available.</p>
        )}
      </div>
    </div>
  );
}

export default PlayList;
