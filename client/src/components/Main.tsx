import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import ArtistTile from './ArtistTile';
import TracksTile from './TracksTile';
import NavBar from './NavBar';

interface User {
  country: string;
  display_name: string;
  email: string;
  followers: any;
  href: string;
  id: string;
  images: any;
  product: string;
  type: string;
  uri: string;
}

const Main = () => {
  const initialCookieValue = Cookies.get('spotify_access_token');
  const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
  const [userInfo, setUserInfo] = useState<User>({ country: '', display_name: '', email: '', followers: '', href: '', id: '', images: '', product: '', type: '', uri: '',});
  const [TopTracks, setTopTracks] = useState<any>(null);
  const [TopArtists, setTopArtists] = useState<any>(null);

  const getUserInfo = async () => {
    try {
      console.log('getUserInfo Function')
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      console.log(response);
      const parsedData = {
        country: response.data.country,
        display_name: response.data.display_name,
        email: response.data.email,
        followers: response.data.followers,
        href: response.data.href,
        id: response.data.id,
        images: response.data.images,
        product: response.data.product,
        type: response.data.type,
        uri: response.data.uri,
      };
      setUserInfo(parsedData);
    } catch (error) {
      console.error(error);
    }
  };
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
  const getTopArtists = async () => {
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/top/artists',
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      console.log(response);
      setTopArtists(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (cookie) {
      getUserInfo();
      getTopTracks();
      getTopArtists();
    }
  }, [cookie]);

  return (
    <>
      <NavBar />
      <div className='flex flex-row'>
        <div className="">
          {TopArtists
            ? TopArtists.items.map((artist: any, id: number) => (
                <ArtistTile
                  artist={artist.name}
                  genres={artist.genres}
                  image={artist.images[0].url}
                  id={id + 1}
                />
              ))
            : 'Loading...'}
        </div>
        <div className="">
          {TopTracks
            ? TopTracks.items.map((track: any, id: number) => (
                <TracksTile
                  track = {track.name}
                  artist = {track.artists[0].name}
                  image = {track.album.images[0].url}
                  id={id + 1}
                />
              ))
            : 'Loading...'}
        </div>
      </div>
    </>
  );
};

export default Main;
