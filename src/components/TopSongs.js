import "./css/topsongs.css";
import { useEffect} from "react";
function TopSongs(props) {

  useEffect(() => {
    props.onSubmit("short_term");
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAllTime =  () => {
    const newState = "long_term";
    props.onSubmit(newState);
  };

  const handleMid =  () => {
    const newState = "medium_term";
    props.onSubmit(newState);
  };

  const handleShort =  () => {
    const newState = "short_term";
    props.onSubmit(newState);
  };

  return (
    <div className="songs">
      <form onSubmit={handleSubmit}>
        <button onClick={handleAllTime}>All-Time</button>
        <button onClick={handleMid}>6 Months</button>
        <button onClick={handleShort}>4 Weeks</button>
      </form>
    </div>
  );
}
export default TopSongs;
