import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.png";
import mockup from './mockup.png';
import SideBar from "./components/SideBar/SideBar";
import Home from "./components/Home/Home";
import Stats from "./components/Stats/Stats";
import Playlists from "./components/PlayLists/PlayList";

function App() {
  const CLIENT_ID = "cec7b93ed47b441eb8056ba8ffc7be20";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize/";
  const RESPONSE_TYPE = "token";
  const scopes = ["user-top-read","playlist-read-private","playlist-read-collaborative","playlist-modify-public","playlist-modify-private"];
  const [token, setToken] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [userid, setUserId] = useState('');
  const [displaySidebar, setDisplaySidebar] = useState(window.innerWidth >= 800);

  const handleMenuClick = (component) => {
    setSelectedComponent(component);
  };
  
  useEffect(() => {
    const handleResize = () => {
      setDisplaySidebar(window.innerWidth >= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    let receivedToken = window.localStorage.getItem("token");
  
    if (!receivedToken && hash) {
      receivedToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
  
      window.location.hash = "";
      window.localStorage.setItem("token", receivedToken);
    }
    
    setToken(receivedToken);
  }, []);
  
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };  
  
  const getUserId = (id) => {
    setUserId(id);
  }

  return (
    <div className="App">
      <header className={displaySidebar ? 'App-header' : 'App-header nsd'}>
        <img src={logo} alt="logo" style={{ width: "120px" }} />
        {!token ? (
          <button type="button" className="login__button">
            <a
              className="login"
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&response_type=${RESPONSE_TYPE}`}
            >
              Login
            </a>
          </button>
        ) : (
          <button onClick={logout} className="logout">
            Logout
          </button>
        )}
      </header>
      {token ? (
        <div className="main">
          <SideBar token={token} handleMenuClick={handleMenuClick} user={getUserId} />
          <div className="content">
            {selectedComponent === "home" ? (
              <Home token={token} user={getUserId} id={userid} sidebar={displaySidebar}/>
            ) : selectedComponent === "stats" ? (
              <Stats token={token} />
            ) : (
              <Playlists token={token} id={userid}/>
            )}
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="about">
            <h4>
              View your most streamed Artist and Songs at
              <span> one place.</span>
            </h4>
            <h4>
              Discover new songs and playlists made <span> for you.</span>
            </h4>
          </div>
          <img src={mockup} alt="" style={{ width: "60%" }} />
        </div>
      )}
    </div>
  );
}

export default App;
