import SongShow from "./SongShow";
import './imagelist.css';
function RenderSongs(props) {
  const renderSongImages = props.songs.map((song) => {
    return (
      <div key={song.id}>
        {song.album.images.length ? (
          <SongShow image={song.album} displaySongs={props.displaySongs} />
        ) : (
          <div>No Image</div>
        )}
        <p>{song.name}</p>
      </div>
    );
  });
  return <div className="list">{renderSongImages}</div>;
}
export default RenderSongs;
