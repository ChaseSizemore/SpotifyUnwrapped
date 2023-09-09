import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import NavBar from './NavBar';
import axios from 'axios';

import SongTile from './SongTile';

interface TrackData{


}

const Songs = () => {
  const initialCookieValue = Cookies.get('spotify_access_token');
  const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
  const [topTracks, setTopTracks] = useState<any>(null);

  const getTopTracks = async () => {
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks',
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      console.log(response);
      setTopTracks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTopTracks();
  }, [cookie]);

  return (
    <>
      <NavBar />
      <div className='ml-20'>
        <h1 className=' text-2xl font-bold'>Top Tracks</h1>
        <ul className='mx-5'>
            {topTracks?.items.map((track: any) => (
                <SongTile
                    key = {track.id}
                    songName={track.name}
                    artistName={track.artists[0].name}
                    albumName={track.album.name}
                    albumArt={track.album.images[0].url}
                />
            ))}

        </ul>

      </div>
    </>
  );
};

export default Songs;
