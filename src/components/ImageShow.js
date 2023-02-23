function ImageShow(props){
    
    return (
        <div>
            {props.displayArtists && props.displaySongs ? <img src={props.image.images[1].url} alt=""/> : <img src={props.image.images[1].url} alt=""/>}
        </div>
        
    )
}
export default ImageShow;