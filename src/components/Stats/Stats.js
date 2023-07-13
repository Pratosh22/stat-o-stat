import React, { useState, useEffect } from "react";
import "./Stats.css";
import ArtistCard from "../ArtistCard/ArtistCard";
import GenreStat from "./GenreStat/GenreStat";
import SongStat from "./SongStat/SongStat";

function SongStats({ token,sidebar }) {
  const [active, setActive] = useState("4weeks");
  const [timerange, setTimerange] = useState("short_term");
  const [selected, setSelected] = useState("artists");
  const [hasData, setHasData] = useState(true);
  let visibility=sidebar;
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

  const handleSelect = (option) => {
    setSelected(option);
  };

  useEffect(() => {
    setHasData(true);
  }, [selected]);
  return (
    <div className="stats">
      <hr style={{ width: "100%" }} />

      {selected !== "genres" && (
        <div className={visibility ? 'header' : 'header sidebar__header'}>
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
      )}

      <div className={visibility ? 'stats-container' : 'stats-container sidebar__stats-container'}>
        <div className={visibility ? 'stat__title' : 'stat__title reduced_size'}>
          <h2
            className={selected === "tracks" ? "active" : ""}
            onClick={() => {
              handleSelect("tracks");
            }}
          >
            <i className="fa-solid fa-music"></i>MY TOP SONGS
          </h2>
          <h2
            className={selected === "artists" ? "active" : ""}
            onClick={() => {
              handleSelect("artists");
            }}
          >
            <i className="fa-solid fa-user"></i>MY TOP ARTISTS
          </h2>
          <h2
            className={selected === "genres" ? "active" : ""}
            onClick={() => {
              handleSelect("genres");
            }}
          >
            <i className="fa-solid fa-heart"></i>MY TOP GENRES
          </h2>
        </div>
        <div className="display__artists">
          {selected === "artists" && (
            <ArtistCard token={token} state={timerange} setHasData={setHasData} responsive={visibility}/>
          )}
          {selected === "genres" && (
            <GenreStat token={token} setHasData={setHasData} responsive={visibility}/>
          )}
          {selected === "tracks" && (
            <SongStat token={token} state={timerange} setHasData={setHasData} responsive={visibility}/>
          )}
        </div>
        {!hasData && selected !== "genres" && (
          <div className="no-data-message">
            {selected === "artists" ? "Artists" : "Songs"}: Not enough data to render.
          </div>
        )}
      </div>
    </div>
  );
}

export default SongStats;
