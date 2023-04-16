import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import "./App.css";
import RenderComponent from "./components/RenderComponent";
function App() {
  const CLIENT_ID = "cec7b93ed47b441eb8056ba8ffc7be20";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize/";
  const RESPONSE_TYPE = "token";
  const scopes = ["user-top-read"];
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    setArtists([]);
    setSongs([]);
    setRecom([]);
    window.localStorage.removeItem("token");
  };

  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [recom, setRecom] = useState([]);
  const [active,setActive]=useState(false);
  const getTopArtist = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 3,
          offset: 5,
          time_range:"long_term"
        },
      }
    );
    return data.items;
  };

  const getTopSongs = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 4,
          offset: 5,
          time_range:"long_term"
        },
      }
    );
    return data.items;
  };
  
   const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 10,
          offset: 5,
          time_range:"long_term"
        },
      }
    );
    setSongs([]);
    setRecom([]);
    setArtists(data.items);
  };  
  
  const searchSongs = async (time) => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 10,
          offset: 5,
          time_range:time
        },
      }
    );

    setArtists([]);
    setRecom([]);
    setSongs(data.items);
  };

  const getRecommendations = async (e) => {
    e.preventDefault();
    const res=await getTopArtist();
    const songs=await getTopSongs();
    const id=res[0].uri;
    const newId=id.substring(15);
    console.log(newId);
    const { data } = await axios.get(
      "https://api.spotify.com/v1/recommendations?",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          seed_artists: newId+","+res[1].uri.substring(15),
           seed_genres: res[0].genres[0]+res[0].genres[1]+res[1].genres[0]+res[1].genres[1]+res[2].genres[0]+res[2].genres[1],
          seed_tracks: songs[0].uri.substring(14)+","+songs[1].uri.substring(14),
          limit: 10,
        },
      }
    );
    setArtists([]);
    setSongs([]);
    setRecom(data.tracks);
  };

  const handleActive=()=>{
    setActive(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            className="login"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout} className="logout">
            Logout
          </button>
        )}
      </header>
      {token ? (
          <Search
            handleActive={handleActive}
            onSubmit={searchArtists}
            onSongs={searchSongs}
            onRecom={getRecommendations}
          />
        ) : (
          <h2>Please Login</h2>
        )}
      {
        active && <RenderComponent artists={artists} songs={songs} recom={recom} />
      }
    </div>
  );
}
export default App;
