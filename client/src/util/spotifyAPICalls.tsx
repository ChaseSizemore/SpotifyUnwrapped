import axios from 'axios';
import Cookies from 'js-cookie';

let  cookie = Cookies.get('spotify_access_token');

export type TimeRange = 'short' | 'medium' | 'long';

export interface ProfileType {
  display_name: string;
  followers: { total: number };
  images: { url: string }[];
  country: string;
  product: string;
}

// Function to get param and set cookie
// export const getParamsAndSetCookie = () => {
//   const urlParams = new URLSearchParams(location.search);
//   const accessToken = urlParams.get('access_token');
//   if (accessToken) {
//     Cookies.set('spotify_access_token', accessToken);
//   }
//   cookie = Cookies.get('spotify_access_token');
//   return accessToken;
// };

const headers = {
  Authorization: `Bearer ${cookie}`,
};

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
export const getProfile = async () => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

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

// Function to get the user's top five Songs from Spotify
export const getTopFiveSongs = async () => {
  const requestURL =
    'https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=long_term';
  try {
    const response = await axios.get(requestURL, {
      headers,
    });
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
};

// Function to get the user's top five artists from Spotify
export const getTopFiveArtists = async () => {
  const requestURL =
    'https://api.spotify.com/v1/me/top/artists?limit=5&time_range=long_term';
  try {
    const response = await axios.get(requestURL, {
      headers,
    });
    console.log(headers)
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
};

//Function to get the number of artists the user follows from Spotify
export const getNumArtists = async () => {
  const requestURL = 'https://api.spotify.com/v1/me/following?type=artist';
  try {
    const response = await axios.get(requestURL, {
      headers,
    });
    return response.data.artists.total;
  } catch (error) {
    console.error(error);
  }
};

//Function to get the number of playlists the user has from Spotify
export const getNumPlaylists = async () => {
  const requestURL = 'https://api.spotify.com/v1/me/playlists';
  try {
    const response = await axios.get(requestURL, {
      headers,
    });
    return response.data.total;
  } catch (error) {
    console.error(error);
  }
};

//Function to logout the user from Spotify
export const logout = () => {
  Cookies.remove('spotify_access_token');
  window.location.href = '/';
};