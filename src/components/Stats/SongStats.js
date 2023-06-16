import React from "react";
import "./SongStats.css";
import { useState } from "react";
import ArtistCard from "../ArtistCard/ArtistCard";
function SongStats({ token }) {
    const [active, setActive] = useState(0);
  return (
    <div className="stats">
      <hr style={{ width: "100%" }} />
      <div className="header">
        <h3>
          <i className="fa-solid fa-forward-fast"></i>All Time
        </h3>
        <h3>
          <i className="fa-solid fa-forward"></i>Last 6 months
        </h3>
        <h3>
          <i className="fa-solid fa-forward-step"></i>Last 4 weeks
        </h3>
      </div>
      <div className="stats-container">
        <div className="stat__title">
          <h2>
            <i className="fa-solid fa-user"></i>MY TOP ARTISTS
          </h2>
          <div className="display__artists">
            <ArtistCard token={token} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongStats;
