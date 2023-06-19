import React from "react";
import "./EditModal.css";
import { useState } from "react";
import { editPlaylist } from "../../api";
function EditModal({ handleClose, playlist_id }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editPlaylist(
        localStorage.getItem("token"),
        playlist_id,
        name,
        description
      );
      console.log(response);
      if(Object.keys(response).length === 0){
        alert("Playlist edited successfully");
        handleClose();
        window.location.reload();
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="submit__div">
            <input type="submit" value="Submit" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
