import React from 'react';
import { getTopArtists } from '../../api';
import { useState,useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import './ArtistCard.css';
function ArtistCard({token,state}) {
    const [artists, setArtists] = useState([]);
    const [loader,setLoader]=useState(false);
    useEffect(() => {
        setLoader(true)
        const fetchData = async () => {
            try {
                const topArtists = await getTopArtists(token, 10, state);
                setArtists(topArtists);
                setLoader(false)
            } catch (error) {
                // Handle error
                console.log(error);
            }
        };
        fetchData();
    }, [state,token]);

    return (
        <div className='artist'>
            {loader && <Spinner />}
            {artists.map((artist) => {
                return (
                    <div className='card' key={artist.id}>
                        <img src={artist.images[0].url} alt='artist' />
                        <div className='title'>{artist.name}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default ArtistCard;