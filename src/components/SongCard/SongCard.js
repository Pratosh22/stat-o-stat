import React from "react";
import "./Smallcard.css";
function SongCard({ songs }) {
  return (
    <div className="recom">
      {songs.map((song) => {
        return (
          <div className="card" key={song.id}>
            <div className="overlayer">
              <i className="far fa-play-circle"></i>
            </div>
            <img src={song.album.images[0].url} alt="album-cover" />
            <div className="title">
                {song.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SongCard;
