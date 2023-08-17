import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAccessTokenFromURL = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get('access_token');
  };

  const fetchPlaylists = async (token:any) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response)
      setPlaylists(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getAccessTokenFromURL();
    if (!token) {
      console.error('No access token found in the URL');
      setLoading(false);
      return;
    }

    fetchPlaylists(token);
  }, []);

  return (
    <>
      <h1>Playlist</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {playlists.items.map((playlist:any) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
      )}

    </>
  );
};

export default Playlist;
