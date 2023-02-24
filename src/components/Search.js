import { useState } from "react";
import "./search.css";
function Search(props) {
  const [displayArtists, setDisplayArtists] = useState(false);
  const [displaySongs, setDisplaySongs] = useState(false);
  const [displayRecom, setDisplayRecom] = useState(false);

  function handleSongs(e) {
    if (displaySongs === false) {
      setDisplaySongs(true);
    } else {
      setDisplaySongs(false);
    }
    setDisplayArtists(false);
    props.onSongs(e, displaySongs);
  }
  const handleArtist = (e) => {
    if (displayArtists === false) {
      setDisplayArtists(true);
    } else {
      setDisplayArtists(false);
    }
    setDisplaySongs(false);
    props.onSubmit(e, displayArtists);
  };

  const handleRecom = (e) => {
    if (displayRecom === false) {
      setDisplayRecom(true);
    } else {
      setDisplayRecom(false);
    }
    setDisplaySongs(false);
    setDisplayArtists(false);
    props.onRecom(e, displayRecom);
  };
  
  const handlesubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <button onClick={handleArtist}>Show my top Artists!</button>
        <button onClick={handleSongs}>Show my top Songs! </button>
        <button onClick={handleRecom}>Show my Recommendations!</button>
      </form>
    </div>
  );
}
export default Search;
