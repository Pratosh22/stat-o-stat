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
        {artist.name}
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
        {song.name}
      </div>
    );
  });

  return (
    <div className="image-list">
      {props.displayArtists ? renderArtistImages : renderSongImages}
    </div>
  );
}
export default ImageList;
