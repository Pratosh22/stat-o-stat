import React, { useState, useEffect } from "react";
import "./Smallcard.css";

function SongCard({ songs, state }) {
  const [activeSong, setActiveSong] = useState(null);
  const [audio, setAudio] = useState(null);
  const [displayedSongs, setDisplayedSongs] = useState(10);
  const showLessButtonVisible = displayedSongs > 10;

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const handleAudio = (song) => {
    if (audio && audio.src === song.preview_url) {
      // Pause the same song if it's already playing
      audio.pause();
      setAudio(null);
      setActiveSong(null);
    } else {
      // Pause the current audio and play the new song
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(song.preview_url);
      setAudio(newAudio);
      setActiveSong(song.id);
      newAudio.play();
    }
  };

  const handleShowMore = () => {
    setDisplayedSongs(displayedSongs + 10);
  };

  const handleShowLess = () => {
    setDisplayedSongs(10);
  };

  return (
    <div>
      <div className="home__buttons">
        {songs.length > displayedSongs && (
          <button className="show-more-button" onClick={handleShowMore}>Show More</button>
        )}
        {showLessButtonVisible && (
          <button onClick={handleShowLess} className="show-less-button">Show Less</button>
        )}
      </div>

      <div className={state ? "recom" : "songStat"}>
        {songs.slice(0, displayedSongs).map((song) => {
          const isSongActive = activeSong === song.id;
          const imageUrl =
            song.album.images.length > 0
              ? song.album.images[0].url
              : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcityofmebanenc.gov%2Fparks-facilities-trails%2Fplaceholder-image%2F&psig=AOvVaw3zpYvrcMVPKG_p9PV3Neni&ust=1687082480240000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPjw9pCGyv8CFQAAAAAdAAAAABAE";
          return (
            <div className="card" key={song.id}>
              <div className="overlayer">
                {isSongActive ? (
                  <i
                    className="fa-solid fa-pause"
                    onClick={() => handleAudio(song)}
                  ></i>
                ) : (
                  <i
                    className="far fa-play-circle"
                    onClick={() => handleAudio(song)}
                  ></i>
                )}
              </div>
              <img src={imageUrl} alt="album-cover" />
              <div className="title">{song.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongCard;
