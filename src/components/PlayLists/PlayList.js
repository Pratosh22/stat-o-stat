import React, { useEffect, useState } from "react";
import { getPlaylist } from "../../api";
import Spinner from "../Spinner/Spinner";
import "./PlayList.css";
function PlayList({ token, id }) {
  const [loader, setLoader] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const response = await getPlaylist(token, id);
        const fetchedPlaylists = response.items;
        setPlaylists(fetchedPlaylists);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setPlaylists([]);
        setLoader(false);
      }
    };
    fetchData();
  }, [token, id]);

  return (
    <div>
      {loader && <Spinner />}
      <hr style={{width:"100%"}}/>
      <h3>Playlists</h3>
      <div className="playlist">
        {Array.isArray(playlists) && playlists.length > 0 ? (
          playlists.map((item) => (
            <div className="playlist__item card" key={item.id}>
              {item.images && item.images.length > 0 && (
                <img src={item.images[0].url} alt="playlist" />
              )}
              <h5>{
               item.name}</h5>
            </div>
          ))
        ) : (
          <p>No playlists available.</p>
        )}
      </div>
    </div>
  );
}

export default PlayList;
