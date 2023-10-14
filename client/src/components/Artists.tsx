/**
 * Renders a component that displays the user's top artists on Spotify.
 *
 * @returns A React component that displays the user's top artists on Spotify.
 */

import React, { useState, useEffect, useCallback } from 'react';
import ImageList from '@mui/material/ImageList';
import NavBar from './NavBar';
import ArtistTile from './ArtistTile';
import { getTopArtists, TimeRange } from '../util/spotifyAPICalls';

const Artists = () => {
  const [artists, setArtists] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [loading, setLoading] = useState(true);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    setLoading(true);
    getTopArtists('medium')
      .then((data) => {
        setArtists(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /**
   * Handles the change of time range and fetches the top artists based on the selected range.
   * @param {TimeRange} range - The selected time range.
   * @returns {void}
   */
  
  const handleTimeRangeChange = (range: TimeRange): void => {
    setLoading(true);
    getTopArtists(range)
      .then((data) => {
        setArtists(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
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
