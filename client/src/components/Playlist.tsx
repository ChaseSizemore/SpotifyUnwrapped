import React, { useState, useEffect } from 'react';

import ImageList from '@mui/material/ImageList';

import NavBar from './NavBar';
import PlaylistTile from './PlaylistTile';

import { getPlaylists } from '../util/spotifyAPICalls';

const Playlist = () => {
  const [playlists, setPlaylists] = useState<any>(null);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    getPlaylists().then((data) => {
      setPlaylists(data);
      setLoading(false); // Set loading to false once data is fetched
    });
  }, []);

  return (
    <>
      <NavBar />
      <div
        className={`transition-all duration-100 md:ml-40 md:mr-20 mt-20 mx-5`}
      >
        <h1 className="text-2xl font-bold">Playlists</h1>
        <ImageList
          cols={4}
          style={{
            transition: 'opacity 0.5s',
            opacity: loading ? 0 : 1,
          }}
        >
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
