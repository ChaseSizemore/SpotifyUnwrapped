import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import NavBar from './NavBar';
import PlaylistTile from './PlaylistTile';

type TimeRange = 'short' | 'medium' | 'long';


const Playlist = () => {
  const initialCookieValue = Cookies.get('spotify_access_token');
  const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
  const [playlists, setPlaylists] = useState([]);
  const [playlistIds, setPlaylistIds] = useState<any>([]); //This state stores all selected playlist ids ot be transfered. functionality is currently down due to soundcloud API

  const getRequestURL = (length: TimeRange): string => {
    const timeRanges: Record<TimeRange, string> = {short: 'short_term', medium: 'medium_term', long: 'long_term',};
    const baseUrl = 'https://api.spotify.com/v1/me/playlists?limit=50';
    const timeRange = timeRanges[length];
    return timeRange ? `${baseUrl}&time_range=${timeRange}` : baseUrl;
  };

  const getPlaylists = async (length: TimeRange) => {
    const requestURL = getRequestURL(length);
    console.log(requestURL)

    try {
      const response = await axios.get(requestURL, {
        headers: {Authorization: `Bearer ${cookie}`,},
      });
      console.log('response:', response);
      console.log('request:', response.data);
      setPlaylists(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };
  const addPlaylistId = (id: string): void => {
    setPlaylistIds([...playlistIds, id]);
  };
  const removePlaylistId = (id: string): void => {
    const newPlaylistIds = playlistIds.filter((playlistId: string) => {
      return playlistId !== id;
    });
    setPlaylistIds(newPlaylistIds);
  };
  const handleToggleChange = (id: string, isChecked: boolean): void => {
    console.log(id, isChecked);
    if (isChecked) {
      addPlaylistId(id);
    } else {
      removePlaylistId(id);
    }
  };
  const handleTransfer = async () => {};

  useEffect(() => {
    console.log(playlistIds);
    console.log('in use effect - playlist ID')
  }, [playlistIds]);

  useEffect(() => {
    if (cookie) {
      console.log('in use effect - cookie')
      getPlaylists('medium');
    }
  }, [cookie]);
  return (
    <>
      <NavBar />
      <div className='ml-20'>
        <h1 className=' text-2xl font-bold'>Playlists</h1>
        <div className='flex flex-row'>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => getPlaylists('short')}
          >
            Short Term
          </button>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => getPlaylists('medium')}
          >
            Medium Term
          </button>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => getPlaylists('long')}
          >
            Long Term
          </button>

          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleTransfer}
          >
            Transfer
          </button>
          </div>
          <div className='flex flex-col'>
            <ul>
              {playlists.map((playlist: any, id: number) => (
                <PlaylistTile
                  key={id}
                  playlistId={playlist.id}
                  playlistName={playlist.name}
                  playlistDescription={playlist.description}
                  playlistImage={playlist.images[0].url}
                  handleCheck={handleToggleChange}
                  isChecked={playlistIds.includes(playlist.id)}
                />
              ))}
            </ul>

            </div>
          

      </div>
    </>
  );
};

export default Playlist;
