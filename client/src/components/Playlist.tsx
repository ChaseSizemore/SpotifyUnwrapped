import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import ImageList from '@mui/material/ImageList';
import ListSubheader from '@mui/material/ListSubheader';
import ImageListItem from '@mui/material/ImageListItem';

import NavBar from './NavBar';
import PlaylistTile from './PlaylistTile';

const Playlist = () => {
  const initialCookieValue = Cookies.get('spotify_access_token');
  const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
  const [playlists, setPlaylists] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {setWindowWidth(window.innerWidth)};
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => { window.removeEventListener('resize', handleResize)};
  }, []);

  const getPlaylists = async () => {
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/playlists',
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      setPlaylists(response.data);
      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, [cookie]);
  return (
    <>
      <NavBar />
      <div className={windowWidth >= 600 ? "ml-20 mt-20" : "mt-20"}>
        <h1 className=" text-2xl font-bold">Top Tracks</h1>
        <ImageList cols={4}>
          {playlists?.items.map((playlist: any) => (
            <PlaylistTile
              key={playlist.id}
              playlistName={playlist.name}
              playlistArt={playlist.images[0].url}
              playlistID={playlist.id}
            />

          ))}
        </ImageList>
      </div>
    </>
  );
};

export default Playlist;
