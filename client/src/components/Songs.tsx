import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import ImageList from '@mui/material/ImageList';
import ListSubheader from '@mui/material/ListSubheader';
import ImageListItem from '@mui/material/ImageListItem';

import NavBar from './NavBar';
import axios from 'axios';

import SongTile from './SongTile';

type TimeRange = 'short' | 'medium' | 'long';

const Songs = () => {
  const initialCookieValue = Cookies.get('spotify_access_token');
  const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
  const [topTracks, setTopTracks] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {setWindowWidth(window.innerWidth)};
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => { window.removeEventListener('resize', handleResize)};
  }, []);
  
  const getRequestURL = (length: TimeRange): string => {
    const timeRanges: Record<TimeRange, string> = {short: 'short_term', medium: 'medium_term', long: 'long_term',};
    const baseUrl = 'https://api.spotify.com/v1/me/top/tracks?limit=50';
    const timeRange = timeRanges[length];
    return timeRange ? `${baseUrl}&time_range=${timeRange}` : baseUrl;
  };

  const getTopTracks = async (length: TimeRange) => {
    const requestURL = getRequestURL(length);
    try {
      const response = await axios.get(requestURL, {
        headers: {Authorization: `Bearer ${cookie}`,},
      });
      setTopTracks(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTopTracks('medium');
  }, [cookie]);

  return (
    <>
      <NavBar />
      <div className={windowWidth >= 600 ? "ml-20 mt-20" : "mt-20 mx-5"}>
        <h1 className=" text-2xl font-bold">Top Tracks</h1>
        <ImageList cols={4}>
          <ImageListItem key="Subheader" cols={4}>
            <ListSubheader  className = "cursor-pointer" onClick={() => getTopTracks('long')}>Full</ListSubheader>
            <ListSubheader className = "cursor-pointer" onClick={() => getTopTracks('medium')}>6 Months</ListSubheader>
            <ListSubheader className = "cursor-pointer" onClick={() => getTopTracks('short')}>4 Weeks</ListSubheader>
          </ImageListItem>
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
