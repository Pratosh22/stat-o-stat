import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import ImageList from "./components/ImageList";
import "./App.css";
import RenderRecom from "./components/RenderRecom";
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
    window.localStorage.removeItem("token");
  };

  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);

  const [displaySongs, setDisplaySongs] = useState(false);
  const [displayArtists, setDisplayArtists] = useState(false);
  const [recom,setRecom] = useState([]);

  const searchArtists = async (e, value) => {
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
        },
      }
    );
    if (value === true) {
      setDisplayArtists(true);
    } else {
      setDisplayArtists(false);
    }
    setSongs([]);
    setRecom([]);
    setArtists(data.items);
  };

  const searchSongs = async (e, value) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 10,
          offset: 5,
        },
      }
    );
    if (value === true) {
      setDisplaySongs(true);
    } else {
      setDisplaySongs(false);
    }
    setArtists([]);
    setRecom([]);
    setSongs(data.items);
  };

  const getRecommendations = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/recommendations?",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          seed_artists:"4NHQUGzhtTLFvgF5SZesLK",
          seed_genres:"pop",
          seed_tracks:"0c6xIDDpzE81m2q797ordA",
          limit: 10,
        },
      }
    );
    setArtists([]);
    setSongs([]);
    setRecom(data.tracks);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>

        {token ? (
          <Search onSubmit={searchArtists} onSongs={searchSongs} onRecom={getRecommendations}/>
        ) : (
          <h2>Please Login</h2>
        )}
        {!token ? (
          <a className="login"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout} className="logout">Logout</button>
        )}
      </header>
      <ImageList
        artists={artists}
        songs={songs}
        displayArtists={displayArtists}
        displaySongs={displaySongs}
      />
    <RenderRecom recom={recom}/>
    </div>
  );
}
export default App;
