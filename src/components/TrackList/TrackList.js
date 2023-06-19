import React from "react";
import placeholderImage from "../../placeholder-image.png";
import "./TrackList.css";
import { useState } from "react";
import EditModal from "../EditModal/EditModal";
function TrackList({ tracks,id }) {
  const [show, setShow] = useState(false);
  function formatDuration(duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const handleEdit = () => {
    setShow(true);
  };

  return (
    <div>
      {show ? (
        <EditModal
          handleClose={() => setShow(false)}
          playlist_id={id}
        />
      ) : null}
      <div className="tracklist-container">
        <div className="edit__div">
          <button className="edit" onClick={handleEdit}>
            <i className="fa-solid fa-user-pen"></i>Edit Playlist
          </button>
        </div>
        <table className="tracklist">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>
                <i className="fa-solid fa-clock"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => {
              const albumImage =
                track.track.album.images[2]?.url || placeholderImage;
              const trackName = track.track.name;
              const artistName = track.track.artists[0]?.name;
              const albumName = track.track.album.name;
              const duration = track.track.duration_ms;

              return (
                <tr key={track.track.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="track-info">
                      <img
                        className="track__image"
                        src={albumImage}
                        alt="track"
                      />
                      <div className="track__name">{trackName}</div>
                    </div>
                  </td>
                  <td>{artistName}</td>
                  <td>{albumName}</td>
                  <td>{formatDuration(duration)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrackList;
