import React, { useState, useEffect } from "react";
import "./Stats.css";
import ArtistCard from "../ArtistCard/ArtistCard";

function SongStats({ token }) {
  const [active, setActive] = useState("4weeks");
  const [timerange, setTimerange] = useState("short_term"); //

  useEffect(() => {
    if (active === "allTime") {
      setTimerange("long_term");
    } else if (active === "6months") {
      setTimerange("medium_term");
    } else {
      setTimerange("short_term");
    }
  }, [active]);

  const handleClick = (option) => {
    setActive(option);
  };

  return (
    <div className="stats">
      <hr style={{ width: "100%" }} />
      <div className="header">
        <h3
          className={active === "allTime" ? "active" : ""}
          onClick={() => handleClick("allTime")}
        >
          <i className="fa-solid fa-forward-fast"></i>All Time
        </h3>
        <h3
          className={active === "6months" ? "active" : ""}
          onClick={() => handleClick("6months")}
        >
          <i className="fa-solid fa-forward"></i>Last 6 months
        </h3>
        <h3
          className={active === "4weeks" ? "active" : ""}
          onClick={() => handleClick("4weeks")}
        >
          <i className="fa-solid fa-forward-step"></i>Last 4 weeks
        </h3>
      </div>
      <div className="stats-container">
        <div className="stat__title">
          <h2>
            <i className="fa-solid fa-user"></i>MY TOP ARTISTS
          </h2>
          <div className="display__artists">
            <ArtistCard token={token} state={timerange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongStats;
