import axios from 'axios';
import Cookies from 'js-cookie';

let cookie = Cookies.get('spotify_access_token');

const headers = {
  Authorization: `Bearer ${cookie}`,
};

export type TimeRange = 'short' | 'medium' | 'long';

// Function to get the user's top tracks from Spotify
export const getTopTracks = async (length: TimeRange) => {
  const timeRanges: Record<TimeRange, string> = {
    short: 'short_term',
    medium: 'medium_term',
    long: 'long_term',
  };

  const baseUrl = 'https://api.spotify.com/v1/me/top/tracks?limit=50';
  const timeRange = timeRanges[length];
  const requestURL = timeRange ? `${baseUrl}&time_range=${timeRange}` : baseUrl;

  try {
    const response = await axios.get(requestURL, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Function to get the user's top artists from Spotify
export const getTopArtists = async (length: TimeRange) => {
  const timeRanges: Record<TimeRange, string> = {
    short: 'short_term',
    medium: 'medium_term',
    long: 'long_term',
  };
  const baseUrl = 'https://api.spotify.com/v1/me/top/artists?limit=50';
  const timeRange = timeRanges[length];
  const requestURL = timeRange ? `${baseUrl}&time_range=${timeRange}` : baseUrl;
  try {
    const response = await axios.get(requestURL, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Function to get the user's profile from Spotify

// Function to get the user's playlists from Spotify

export const getPlaylists = async () => {
  const baseUrl = 'https://api.spotify.com/v1/me/playlists';
  try {
    const response = await axios.get(baseUrl, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};