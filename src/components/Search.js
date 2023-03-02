import "./css/search.css";
import { useState } from "react";
import TopSongs from "./TopSongs";
function Search(props) {
  const [Display, setDisplay] = useState("start");
  
  function handleSongs(e) {
    setDisplay("songs");
  }
  const handleArtist = (e) => {
    props.onSubmit(e);
  };

  const handleRecom = (e) => {
    props.onRecom(e);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
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
        <TopSongs onSubmit={props.onSongs}/>
      )}
    </div>
  );
}
export default Search;
