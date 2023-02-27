import ImageShow from "./ImageShow";
import './imagelist.css';
function RenderArtist(props){
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
    return(
        <div className="list">{renderArtistImages}
        </div>
    )
}
export default RenderArtist;