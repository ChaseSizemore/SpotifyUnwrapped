import React, { useState, useEffect } from 'react';

import ImageList from '@mui/material/ImageList';

import NavBar from './NavBar';
import ArtistTile from './ArtistTile';

import { getTopArtists, TimeRange } from '../util/spotifyAPICalls';

const Artists = () => {
  const [artists, setArtists] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);

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
    getTopArtists('medium').then((data) => {
      setArtists(data);
      setLoading(false);
    });
  }, []);

  const handleTimeRangeChange = (range: TimeRange) => {
    setLoading(true);
    getTopArtists(range).then((data) => {
      setArtists(data);
      setLoading(false);
    });
  };

  return (
    <>
      <NavBar />
      <div className={windowWidth >= 600 ? 'ml-20' : 'mt-20'}>
        <div className="flex flex-row justify-between items-center py-5">
          <h1 className=" text-2xl font-bold">Top Artists</h1>
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
            transition: 'opacity 0.5s',
            opacity: loading ? 0 : 1,
          }}
        >
          {artists?.items.map((artist: any) => (
            <ArtistTile
              key={artist.id}
              artistName={artist.name}
              artistArt={artist.images[0].url}
            />
          ))}
        </ImageList>
      </div>
    </>
  );
};

export default Artists;
