import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavBar from './NavBar';

import { getPlaylists, getPlaylistTracks } from '../util/spotifyAPICalls';

type Playlist = {
  playlistId: string;
  playlistName: string;
  playlistDescription: string;
};

const TransferPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<any>([]);
  const [playlistsToTransfer, setPlaylistsToTransfer] = useState<any>([]);

  const googleAuth = () => {
    const authURL =
      process.env.REACT_APP_GOOGLE_AUTH_URL ||
      'http://spotifyunwrapped-env.eba-fnpwcr3p.us-east-1.elasticbeanstalk.com/googlelogin';
    window.location.replace(authURL);
  };

  const transferPlaylists = async () => {
    for (const playlistInfo of playlistsToTransfer) {
      try {
        const playlistTracks = await getPlaylistTracks(playlistInfo.playlistId);

        const data = {
          playlist_name: playlistInfo.playlistName,
          playlist_description: playlistInfo.playlistDescription,
          songs: playlistTracks.items.map((item: any) => ({
            name: item.track.name,
            artist: item.track.artists[0].name,
          })),
        };
        const requestURL =
          process.env.REACT_APP_TRANSFER_URL ||
          'http://spotifyunwrapped-env.eba-fnpwcr3p.us-east-1.elasticbeanstalk.com/create-youtube-playlist';
        const response = await axios.post(requestURL, data);

        if (response.data && response.data.message) {
          console.log(response.data.message); // "Playlist created successfully!"
          console.log(response.data.playlist_id); // The ID of the created playlist
        }
      } catch (error) {
        console.log('Error creating the playlist: ', error);
      }
    }
  };

  const handlePlaylistClick = (
    playlistId: string,
    playlistName: string,
    playlistDescription: string
  ) => {
    const playlist = { playlistId, playlistName, playlistDescription };
    if (playlistsToTransfer.some((p: any) => p.playlistId === playlistId)) {
      setPlaylistsToTransfer(
        playlistsToTransfer.filter((p: any) => p.playlistId !== playlistId)
      );
    } else {
      setPlaylistsToTransfer([...playlistsToTransfer, playlist]);
    }
  };

  useEffect(() => {
    getPlaylists().then((data) => {
      setPlaylists(data.items);
    });
  }, []);

  return (
    <>
      <NavBar />
      <div
        className={`transition-all duration-100 md:ml-40 md:mr-20 mt-40 mx-5 z-0`}
      >
        <div className="flex flex-col justify-center items-center mb-10 ">
          <h1 className="text-3xl font-bold">Welcome To The Transfer Page!</h1>
          <p className="text-xl justify-center items-center">
            To transfer playlists to Youtube:
          </p>
          <p>
            - Log into Youtube <span onClick={googleAuth} className='underline'>HERE</span>
          </p>
          <p>- Select the playlists you want to transfer</p>
          <p>- Click on the transfer button</p>
          <button onClick={transferPlaylists}>Transfer</button>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 z-0">
          {playlists.map((item: any) => (
            <div
              onClick={() =>
                handlePlaylistClick(item.id, item.name, item.description)
              }
              key={item.id}
              className={` transition-all duration-100 relative flex items-center space-x-3 rounded-lg border border-gray-300 px-6 py-5 \
              shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 ${
                playlistsToTransfer.some(
                  (playlist: Playlist) => playlist.playlistId === item.id
                )
                  ? 'bg-green-200'
                  : 'border-gray-300'
              }`}
            >
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={item.images[0].url}
                  alt="playlist image"
                />
              </div>
              <div className="min-w-0 flex-1">
                <a className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {item.description}
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TransferPage;
