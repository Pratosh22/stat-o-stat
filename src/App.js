import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import logo from "./images/logo.png";
import mockup from "./images/mockup.png";
import SideBar from "./components/SideBar/SideBar";

const Home = lazy(() => import("./components/Home/Home"));
const Stats = lazy(() => import("./components/Stats/Stats"));
const Playlists = lazy(() => import("./components/PlayLists/PlayList"));

function App() {
  const CLIENT_ID = "cec7b93ed47b441eb8056ba8ffc7be20";
  const REDIRECT_URI = "https://stat-o-stat.vercel.app/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize/";
  const RESPONSE_TYPE = "token";
  const scopes = [
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
  ];
  const [token, setToken] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [userid, setUserId] = useState("");
  const [displaySidebar, setDisplaySidebar] = useState(
    window.innerWidth >= 800
  );

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
  };

  return (
    <div className="App">
      <header className={displaySidebar ? "App-header" : "App-header nsd"}>
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
        ) : displaySidebar ? (
          <button onClick={logout} className="logout">
            Logout
          </button>
        ) : (
          <div></div>
        )}
      </header>
      {token ? (
        <div className="main">
          <SideBar
            token={token}
            handleMenuClick={handleMenuClick}
            user={getUserId}
            visible={displaySidebar}
          />
          <div className="content">
            <Suspense fallback={<div>Loading...</div>}>
              {selectedComponent === "home" ? (
                <Home
                  token={token}
                  user={getUserId}
                  id={userid}
                  sidebar={displaySidebar}
                />
              ) : selectedComponent === "stats" ? (
                <Stats token={token} sidebar={displaySidebar} />
              ) : (
                <Playlists token={token} id={userid}  sidebar={displaySidebar}/>
              )}
            </Suspense>
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
