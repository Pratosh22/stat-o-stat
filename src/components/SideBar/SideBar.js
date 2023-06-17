import React from "react";
import axios from "axios";
import "./Sidebar.css";

function SideBar(props) {
  const [user, setUser] = React.useState([]);
  const [selectedComponent, setSelectedComponent] = React.useState("home");

  React.useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setUser(data);
    };
    getUser();
  }, [props.token]);

  const handleMenuClick = (component) => {
    setSelectedComponent(component);
    props.handleMenuClick(component);
  };

  const followers = user.followers ? user.followers.total : null;
  const photo = user.images ? user.images[0].url : null;

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar__title">
          <h1>Welcome</h1>
        </div>
        <div className="sidebar__profile">
          <img
            src={photo}
            alt="profile"
            style={{ borderRadius: "50%", width: "100px" }}
          />
          <h3>{user.display_name}</h3>
          <h5 className="followers">Followers: {followers}</h5>
        </div>
        <hr></hr>
        <div className="sidebar__menu">
          <ul>
            <li
              className={selectedComponent === "home" ? "active" : ""}
              onClick={() => handleMenuClick("home")}
            >
              <i className="fa-solid fa-house"></i>Home
            </li>
            <li
              className={selectedComponent === "stats" ? "active" : ""}
              onClick={() => handleMenuClick("stats")}
            >
              <i className="fa-sharp fa-solid fa-chart-simple"></i>Stats
            </li>
            <li
              className={selectedComponent === "playlists" ? "active" : ""}
              onClick={() => handleMenuClick("playlists")}
            >
              <i className="fa-solid fa-music"></i>Playlists
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
