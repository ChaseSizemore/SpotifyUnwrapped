import React, { useEffect, useState } from 'react';

import ImageList from '@mui/material/ImageList';

import NavBar from './NavBar';
import SongTile from './SongTile';

import { getTopTracks, TimeRange } from '../util/spotifyAPICalls';

const Songs = () => {
  const [topTracks, setTopTracks] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopTracks('medium').then((data) => {
      setTopTracks(data);
      setLoading(false);
    });
  }, []);

  const handleTimeRangeChange = (range: TimeRange) => {
    setLoading(true);
    getTopTracks(range).then((data) => {
      setTopTracks(data);
      setLoading(false);
    });
  };

  return (
    <>
      <NavBar />
      <div
        className={`transition-all duration-100 md:ml-40 md:mr-20 mt-20 mx-5`}
      >
        <div className="flex flex-row justify-between items-center py-5">
          <h1 className=" text-2xl font-bold">Top Tracks</h1>
          <div>
            <a
              className="cursor-pointer px-2 underline"
              onClick={() => handleTimeRangeChange('long')}
            >
              Full
            </a>
            <a
              className="cursor-pointer px-2 underline"
              onClick={() => handleTimeRangeChange('medium')}
            >
              6 Months
            </a>
            <a
              className="cursor-pointer px-2 underline"
              onClick={() => handleTimeRangeChange('short')}
            >
              4 Weeks
            </a>
          </div>
        </div>
        <ImageList
          cols={4}
          style={{
            transition: 'opacity 0.25s',
            opacity: loading ? 0 : 1,
          }}
        >
          {topTracks?.items.map((track: any) => (
            <SongTile
              key={track.id}
              songName={track.name}
              artistName={track.artists[0].name}
              albumName={track.album.name}
              albumArt={track.album.images[0].url}
            />
          ))}
        </ImageList>
      </div>
    </>
  );
};

export default Songs;
