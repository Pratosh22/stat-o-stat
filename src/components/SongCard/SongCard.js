import React, { useState, useEffect } from "react";
import "./Smallcard.css";

function SongCard({ songs }) {
  const [activeSong, setActiveSong] = useState(null);
  const [audio, setAudio] = useState(null);

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

  return (
    <div className="recom">
      {songs.map((song) => {
        const isSongActive = activeSong === song.id;

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
            <img
              src={
                song.album.images[0].url
                  ? song.album.images[0].url
                  : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcityofmebanenc.gov%2Fparks-facilities-trails%2Fplaceholder-image%2F&psig=AOvVaw3zpYvrcMVPKG_p9PV3Neni&ust=1687082480240000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPjw9pCGyv8CFQAAAAAdAAAAABAE"
              }
              alt="album-cover"
            />
            <div className="title">{song.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default SongCard;
