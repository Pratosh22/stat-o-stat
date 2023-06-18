import React from 'react';
import './SongStat.css';
import { getTopSongs } from '../../../api';
import SongCard from '../../SongCard/SongCard';
import Spinner from '../../Spinner/Spinner';
import { useEffect,useState } from 'react';
function SongStat({token,state}) {
    const [loader,setLoader]=useState(false);
    const [songs,setSongs]=useState([]);

    useEffect(()=>{
        setLoader(true);
        const fetchData=async()=>{
            const topSongs=await getTopSongs(token,10,state);
            setSongs(topSongs);
            setLoader(false);
        }
        fetchData();
    },[token,state])

    return (
        <div className='song__stats'>
            {loader && <Spinner/>}
            <SongCard songs={songs}/>
        </div>
    );
}

export default SongStat;