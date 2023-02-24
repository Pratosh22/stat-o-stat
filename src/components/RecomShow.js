function RecomShow(props){
    console.log(props.image.images)
    return(
        <div>
            <img src={props.image.images[1].url} alt="" />
        </div>

    )
}
export default RecomShow;