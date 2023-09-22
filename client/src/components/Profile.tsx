import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


interface ProfileType {
  display_name: string;
  followers: {
    total: number;
  };
  images: {
    url: string;
  }[];
  country: string;
  product: string;
}

const Profile = () => {
  const location = useLocation();
  const initialCookieValue = Cookies.get('spotify_access_token');
  const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
  const [profile, setProfile] = useState<ProfileType>({
    display_name: '',
    followers: { total: 0 },
    images: [],
    country: '',
    product: '',
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [topTracks, setTopTracks] = useState<any>(null);
  const [topArtists, setTopArtists] = useState<any>(null);


  useEffect(() => {
    const handleResize = () => {setWindowWidth(window.innerWidth)};
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => { window.removeEventListener('resize', handleResize)};
  }, []);

  const getProfile = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      const data = await response.json();
      console.log(data)
      setProfile({
        display_name: data.display_name,
        followers: data.followers,
        images: data.images,
        country: data.country,
        product: data.product,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getParamsAndSetCookie = () => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('access_token');
    if (accessToken) {
      setCookie(accessToken);
      Cookies.set('spotify_access_token', accessToken);
    }
  };

  const getTopFiveSongs = async () => {
    const requestURL = 'https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=long_term';
    try {
      const response = await axios.get(requestURL, {
        headers: { Authorization: `Bearer ${cookie}` },
      });
      console.log(response.data.items);
      setTopTracks(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const getTopFiveArtists = async () => {
    const requestURL = 'https://api.spotify.com/v1/me/top/artists?limit=5&time_range=long_term';
    try {
      const response = await axios.get(requestURL, {
        headers: { Authorization: `Bearer ${cookie}` },
      });
      console.log(response.data.items);
      setTopArtists(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getParamsAndSetCookie();
  }, []);

  useEffect(() => {
    getProfile();
    getTopFiveSongs();
    getTopFiveArtists();
  }, [cookie]);

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className={`flex flex-col items-center ${windowWidth >= 600 ? "ml-20" : "mt-20"}`}>
          <img src={profile.images && profile.images[0] && profile.images[0].url ? profile.images[0].url : 'https://spotifyunwrapped.s3.amazonaws.com/spotify.png'} alt="profileImage" className="rounded-full w-40 h-40" />
          <h1 className="text-2xl font-bold mt-4">{profile.display_name}</h1>
          <p className="text-lg mt-2">{profile.followers.total} followers</p>
          <p className="text-lg mt-2">{profile.country}</p>
          <p className="text-lg mt-2">{profile.product}</p>
        </div>
      </div>
      <div>
      </div>
    </>
  );
};

export default Profile;
