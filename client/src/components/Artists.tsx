import React, { useState, useEffect } from 'react';

import ImageList from '@mui/material/ImageList';
import ListSubheader from '@mui/material/ListSubheader';
import ImageListItem from '@mui/material/ImageListItem';

import NavBar from './NavBar';
import Cookies from 'js-cookie';

import axios from 'axios';

import ArtistTile from './ArtistTile';

type TimeRange = 'short' | 'medium' | 'long';

const Artists = () => {
  const initialCookieValue = Cookies.get('spotify_access_token');
  const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
  const [artists, setArtists] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const getRequestURL = (length: TimeRange): string => {
    const timeRanges: Record<TimeRange, string> = {
      short: 'short_term',
      medium: 'medium_term',
      long: 'long_term',
    };
    const baseUrl = 'https://api.spotify.com/v1/me/top/artists?limit=50';
    const timeRange = timeRanges[length];
    return timeRange ? `${baseUrl}&time_range=${timeRange}` : baseUrl;
  };

  const getTopArtists = async (length: TimeRange) => {
    const requestURL = getRequestURL(length);
    try {
      const response = await axios.get(requestURL, {
        headers: { Authorization: `Bearer ${cookie}` },
      });
      setArtists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() => {
        getTopArtists('medium');
    }, [cookie]);

  return (
    <>
      <NavBar />
      <div className={windowWidth >= 600 ? 'ml-20' : 'mt-20'}>
      <div className='flex flex-row justify-between items-center py-5'>
          <h1 className=" text-2xl font-bold">Top Artists</h1>
          <div>
            <a className = "cursor-pointer px-2 underline" onClick={() => getTopArtists('long')}>Full</a>
            <a className = "cursor-pointer px-2 underline" onClick={() => getTopArtists('medium')}>6 Months</a>
            <a className = "cursor-pointer px-2 underline" onClick={() => getTopArtists('short')}>4 Weeks</a>

          </div>
        </div>
        <ImageList cols={4}>
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
