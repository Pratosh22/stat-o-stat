import "./css/search.css";
import { useState } from "react";
import TopSongs from "./TopSongs";
function Search(props) {
  const [Display, setDisplay] = useState("start");
  
  function handleSongs(e) {
    setDisplay("songs");
    props.handleActive();
  }
  const handleArtist = (e) => {
    props.onSubmit(e);
    props.handleActive();
  };

  const handleRecom = (e) => {
    props.onRecom(e);
    props.handleActive();
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    props.handleActive();
  };

  return (
    <div className="main">
      {Display === "start" ? (
        <div className="search">
          <form onSubmit={handlesubmit}>
            <button  onClick={handleArtist}>Show my top Artists!</button>
            <button onClick={handleSongs}>Show my top Songs! </button>
            <button onClick={handleRecom}>Show my Recommendations!</button>
          </form>
        </div>
      ) : (
        <div>
          <button onClick={() => setDisplay("start") }>Back</button>
          <TopSongs onSubmit={props.onSongs}/>
        </div>
      )}
    </div>
  );
}
export default Search;
