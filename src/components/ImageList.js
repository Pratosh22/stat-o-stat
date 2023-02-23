import ImageShow from "./ImageShow";
import './imagelist.css';
function ImageList(props) {
  const renderArtistImages = props.artists.map((artist) => {
    return (
      <div key={artist.id}>
        {artist.images.length ? (
          <ImageShow image={artist} displayArtists={props.displayArtists} />
        ) : (
          <div>No Image</div>
        )}
        <p>{artist.name}</p>
      </div>
    );
  });

  const renderSongImages = props.songs.map((song) => {
    return (
      <div key={song.id}>
        
        {song.album.images.length ? (
          <ImageShow image={song.album} displaySongs={props.displaySongs} />
        ) : (
          <div>No Image</div>
        )}
        <p>{song.name}</p>
      </div>
    );
  });

  return (
    <div className="list">
      {props.displayArtists ? renderArtistImages : renderSongImages}
    </div>
  );
}
export default ImageList;
