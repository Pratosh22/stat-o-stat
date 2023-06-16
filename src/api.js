import axios from 'axios';

const API_BASE_URL = 'https://api.spotify.com/v1'; // API base URL

export const getTopArtists = async (token) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/me/top/artists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 2,
        offset: 5,
        time_range: 'short_term',
      },
    });
    return data.items;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    throw error;
  }
};

export const getTopSongs = async (token) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/me/top/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 3,
        offset: 5,
        time_range: 'short_term',
      },
    });
    return data.items;
  } catch (error) {
    console.error('Error fetching top songs:', error);
    throw error;
  }
};

export const getRecommendations = async (token, artists, songs) => {
  try {
    const artistIds = artists.map((artist) => artist.uri.substring(15));
    const trackIds = songs.map((song) => song.uri.substring(14));

    const { data } = await axios.get(`${API_BASE_URL}/recommendations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit:10,
        seed_artists: artistIds.join(','),
        seed_tracks: trackIds.join(','),
      },
    });

    return data.tracks;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
