import { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.png";
import temp from "./temp.webp";
import SideBar from "./components/SideBar/SideBar";
import Home from "./components/Home/Home";
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
    window.localStorage.removeItem("token");
  };

  return (
    <div className="App">
      <header className="App-header">
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
          <SideBar token={token} />
          <Home token={token} />
        </div>
      ) : (
        <div className="wrapper">
          <div className="about">
            <h4>
              View your most streamed Artist and Songs at{" "}
              <span>one place.</span>
            </h4>
            <h4>
              Discover new songs and playlists made <span>for you.</span>
            </h4>
          </div>
          <img src={temp} alt="" style={{ width: "50%", paddingTop: "40px" }} />
        </div>
      )}
    </div>
  );
}
export default App;
