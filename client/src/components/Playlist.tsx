import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import NavBar from './NavBar';

const Playlist = () => {
  const initialCookieValue = Cookies.get('spotify_access_token');
  const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
  const [playlists, setPlaylists] = useState([]);

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
      console.log(response);
      setPlaylists(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Playlists</h1>
        <div className='flex flex-row flex-wrap justify-center'>
          {playlists.map((playlist: any) => {
            return (
              <div className='flex flex-col items-center justify-center p-4'>
                <img
                  className='rounded-full w-20 h-20'
                  src={playlist.images[0].url}
                  alt=''
                />
                <p className='text-xl font-bold'>{playlist.name}</p>
                <p className='text-lg'>{playlist.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
    </>
  );
};

export default Playlist;
