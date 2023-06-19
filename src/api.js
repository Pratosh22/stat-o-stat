import axios from "axios";

const API_BASE_URL = "https://api.spotify.com/v1"; // API base URL

const axiosInstance = axios.create({
  timeout: 10000, // Set the timeout to 15 seconds
});

export const getTopArtists = async (token, limit, time) => {
  try {
    const { data } = await axiosInstance.get(`${API_BASE_URL}/me/top/artists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: limit,
        offset: 5,
        time_range: time,
      },
    });
    return data.items;
  } catch (error) {
    alert("Error fetching top artists:", error);
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token"); // Delete the token from local storage
    }
  }
};

export const getTopSongs = async (token, limit, time) => {
  try {
    const { data } = await axiosInstance.get(`${API_BASE_URL}/me/top/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: limit,
        offset: 5,
        time_range: time,
      },
    });
    return data.items;
  } catch (error) {
    alert("Error fetching top songs:", error);
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token"); // Delete the token from local storage
    }
  }
};

export const getRecommendations = async (token, artists, songs) => {
  try {
    const artistIds = artists.map((artist) => artist.uri.substring(15));
    const trackIds = songs.map((song) => song.uri.substring(14));

    const { data } = await axiosInstance.get(
      `${API_BASE_URL}/recommendations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 10,
          seed_artists: artistIds.join(","),
          seed_tracks: trackIds.join(","),
        },
      }
    );

    return data.tracks;
  } catch (error) {
    alert("Error fetching recommendations:", error);
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token"); // Delete the token from local storage
    }
  }
};

export const getPlaylist = async (token, id) => {
  try {
    const { data } = await axiosInstance.get(
      `${API_BASE_URL}/users/${id}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          public: false,
        },
        params: {
          limit: 50,
        },
      }
    );
    return data;
  } catch (error) {
    alert("Error fetching playlist:", error);
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token"); // Delete the token from local storage
    }
  }
};

export const createPlaylist = async (token, id, name, description) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/users/${id}/playlists`,
      {
        name: name,
        description: description,
        public: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    alert("Error creating playlist:", error);
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token"); // Delete the token from local storage
    }
  }
};

export const addTracksToPlaylist = async (token, playlistId, uris) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/playlists/${playlistId}/tracks`,
      {
        uris: uris,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    alert("Error adding tracks to playlist:", error);
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token"); // Delete the token from local storage
    }
  }
};

export const getTracks = async (token, playlist_id) => {
  try {
    const { data } = await axiosInstance.get(`${API_BASE_URL}/playlists/${playlist_id}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 20,
        offset: 0,
      },
    });
    return data.items;
  } catch (error) {
    alert("Error fetching tracks:", error);
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token"); // Delete the token from local storage
    }
  }
}

export const unfollowPlaylist = async (token, playlist_id) => {
   try{
      const response = await axiosInstance.delete(`${API_BASE_URL}/playlists/${playlist_id}/followers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
   }catch(error){
      alert("Error unfollowing playlist:", error);
      if (error.response && error.response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token"); // Delete the token from local storage
      }
   }
}