import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
  const [userInfo, setUserInfo] = useState<User>({
    country: '',
    display_name: '',
    email: '',
    followers: '',
    href: '',
    id: '',
    images: '',
    product: '',
    type: '',
    uri: '',
  });
  const [TopTracks, setTopTracks] = useState<any>(null);
  const [TopArtists, setTopArtists] = useState<any>(null);

  const getUserInfo = async () => {
    try {
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
      <h1>Main</h1>
      <h1>{cookie}</h1>
      <h1>{userInfo ? userInfo.display_name : 'Loading...'}</h1>
      <h1>{TopTracks ? TopTracks.items[0].preview_url : 'Loading...'}</h1>
      <h1>{TopArtists ? TopArtists.items[0].name : 'Loading...'}</h1>
    </>
  );
};

export default Main;
