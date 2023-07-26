import React, { useState, useEffect } from "react";
import axios from "axios";
import placeholder_img from "../../images/placeholder-image.png";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

function SideBar(props) {
  const [user, setUser] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setUser(data);
      props.user(data.id);
    };
    getUser();
  }, [props.token, props.user]);

  const handleMenuClick = (component) => {
    setSelectedComponent(component);
    setMenuVisible(false);
    props.handleMenuClick(component);
  };

  const handleStateChange = (state) => {
    setMenuVisible(state.isOpen);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const followers = user.followers ? user.followers.total : null;
  const photo = user.images && user.images.length > 0 ? user.images[0].url : placeholder_img;

  const visibility = props.visible;

  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      {visibility ? (
        <div className="sidebar">
          <div className="sidebar__title">
            <h1>Welcome</h1>
          </div>
          <div className="sidebar__profile">
            <img
              src={user.images && user.images.length > 0 ? photo : placeholder_img}
              alt="profile"
              style={{ borderRadius: "50%", width: "100px" }}
            />
            <h3>{user.display_name}</h3>
            <h5 className="followers">Followers: {followers}</h5>
          </div>
          <hr />
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
      ) : (
        <Menu
          left
          isOpen={menuVisible}
          onStateChange={(state) => handleStateChange(state)}
        >
          <div className="sidebar__title">
            <h1>Welcome</h1>
          </div>
          <div className="sidebar__profile">
            <img
              src={user.images && user.images.length > 0 ? photo : placeholder_img}
              alt="profile"
              style={{ borderRadius: "50%", width: "100px",marginBottom:"10px" }}
            />
            <h3>{user.display_name}</h3>
            <h5 className="followers">Followers: {followers}</h5>
          </div>
          <hr />
          <div className="sidebar__menu">
          <ul>
            <li
              className={selectedComponent === "home" ? "active" : ""}
              onClick={() => {
                handleMenuClick("home");
                closeMenu();
              }}
            >
              <i className="fa-solid fa-house"></i>Home
            </li>
            <li
              className={selectedComponent === "stats" ? "active" : ""}
              onClick={() => {
                handleMenuClick("stats");
                closeMenu();
              }}
            >
              <i className="fa-sharp fa-solid fa-chart-simple"></i>Stats
            </li>
            <li
              className={selectedComponent === "playlists" ? "active" : ""}
              onClick={() => {
                handleMenuClick("playlists");
                closeMenu();
              }}
            >
              <i className="fa-solid fa-music"></i>Playlists
            </li>
            <li>
              <button onClick={logout} className="logout" style={{ padding: "5px" }}>
                Logout
              </button>
            </li>
          </ul>
          </div>
        </Menu>
      )}
    </>
  );
}

export default SideBar;
