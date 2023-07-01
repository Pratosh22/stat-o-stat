import React from "react";
import axios from "axios";
import placeholder_img from '../../placeholder-image.png';
import "./Sidebar.css";

function SideBar(props) {
  const [user, setUser] = React.useState([]);
  const [selectedComponent, setSelectedComponent] = React.useState("home");
  const [menuVisible, setMenuVisible] = React.useState(false);

  React.useEffect(() => {
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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
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
            src={
              user.images && user.images.length > 0
                ? photo
                : placeholder_img
            }
            alt="profile"
            style={{ borderRadius: "50%", width: "100px" }}
          />
          <h3>{user.display_name}</h3>
          <h5 className="followers">Followers: {followers}</h5>
        </div>
        <hr />
        <div className="sidebar__menu-toggle" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className={`sidebar__menu ${menuVisible ? "show-menu" : ""}`}>
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
