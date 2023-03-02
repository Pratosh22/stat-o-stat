function ImageShow(props){
    
    return (
        <div>
            <img src={props.image.images[1].url}  style={{borderRadius:"20px"}}alt="artist-img"/>
        </div>
        
    )
}
export default ImageShow;