import React, { useState, useEffect } from 'react';

import ImageList from '@mui/material/ImageList';

import NavBar from './NavBar';
import PlaylistTile from './PlaylistTile';

import { getPlaylists } from '../util/spotifyAPICalls';

const Playlist = () => {
  const [playlists, setPlaylists] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);  // New state for loading

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    getPlaylists().then((data) => {
      setPlaylists(data);
      setLoading(false);  // Set loading to false once data is fetched
    });
  }, []);

  return (
    <>
      <NavBar />
      <div className={windowWidth >= 600 ? 'ml-20' : 'mt-20'}>
        <h1 className=" text-2xl font-bold">Playlists</h1>
        <ImageList 
          cols={4} 
          style={{ 
            transition: 'opacity 0.5s', 
            opacity: loading ? 0 : 1  // Adjust opacity based on loading state
          }}>
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
