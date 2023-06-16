import React from 'react';
import { getTopArtists } from '../../api';
import { useState,useEffect } from 'react';
import './ArtistCard.css';
function ArtistCard({token}) {
    const [artists, setArtists] = useState([]);
    const [loader,setLoader]=useState(false);
    useEffect(() => {
        setLoader(true)
        const fetchData = async () => {
            try {
                const topArtists = await getTopArtists(token, 10,'short_term');
                setArtists(topArtists);
                setLoader(false)
            } catch (error) {
                // Handle error
                console.log(error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className='artist'>
            {loader && <div className="loader"></div>}
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