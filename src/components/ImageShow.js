function ImageShow(props){
    
    return (
        <div>
            <img src={props.image.images[1].url} alt="artist-img"/>
        </div>
        
    )
}
export default ImageShow;