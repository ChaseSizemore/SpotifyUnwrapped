import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import NavBar from './NavBar';

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
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Button
      </button>
      <button onClick={() => {getPlaylists('long'); console.log('long term!')}}>Long Term</button>
      <button onClick={() => {getPlaylists('medium'); console.log('medium term!')}}>Medium Term</button>
      <button onClick={() => {getPlaylists('short'); console.log('short term!')}}>Short Term</button>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          {playlists.map((playlist: any) => {
            return (
              <div className="bg-gray-800 rounded-lg p-4">
                <img
                  src={playlist.images[0].url}
                  alt=""
                  className="rounded-lg"
                />
                <h1 className="text-white text-lg font-bold">
                  {playlist.name}
                </h1>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) =>
                      handleToggleChange(playlist.id, e.target.checked)
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {playlistIds.includes(playlist.id)
                      ? 'Remove Playlist'
                      : 'Transfer Playlist'}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Playlist;
