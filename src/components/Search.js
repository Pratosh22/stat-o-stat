import "./search.css";
function Search(props) {

  function handleSongs(e) {
    props.onSongs(e);
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
    <div className="search">
      <form onSubmit={handlesubmit}>
        <button onClick={handleArtist}>Show my top Artists!</button>
        <button onClick={handleSongs}>Show my top Songs! </button>
        <button onClick={handleRecom}>Show my Recommendations!</button>
      </form>
    </div>
  );
}
export default Search;
