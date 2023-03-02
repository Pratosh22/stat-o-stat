function SongShow(props){
    
    return (
        <div>
            <img src={props.image.images[1].url} style={{borderRadius:"20px"}}alt="song-img"/>
        </div>
        
    )
}
export default SongShow;