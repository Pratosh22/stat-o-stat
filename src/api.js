import axios from 'axios';

const API_BASE_URL = 'https://api.spotify.com/v1'; // API base URL

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
    alert('Error fetching top artists:', error);
    throw error;
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
    alert('Error fetching top songs:', error);
    throw error;
  }
};

export const getRecommendations = async (token, artists, songs) => {
  try {
    const artistIds = artists.map((artist) => artist.uri.substring(15));
    const trackIds = songs.map((song) => song.uri.substring(14));

    const { data } = await axiosInstance.get(`${API_BASE_URL}/recommendations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 10,
        seed_artists: artistIds.join(','),
        seed_tracks: trackIds.join(','),
      },
    });

    return data.tracks;
  } catch (error) {
    alert('Error fetching recommendations:', error);
    throw error;
  }
};
