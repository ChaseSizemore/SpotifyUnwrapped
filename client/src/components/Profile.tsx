import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

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

  const getProfile = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      const data = await response.json();
      console.log(data);
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
      Cookies.set('spotify_access_token', accessToken); // optional, if you want to set it in Cookies as well
    }
  };

  useEffect(() => {
    getParamsAndSetCookie();
  }, []);

  useEffect(() => {
    getProfile();
  }, [cookie]);

  return (
    <>
      <NavBar />
      <div className="flex bg-black">
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="flex flex-col items-center justify-center flex-grow">
            <h1 className="text-white text-2xl font-bold">Profile</h1>
            <h1 className="text-white text-2xl font-bold">
              {profile.display_name}
            </h1>
            <h1 className="text-white text-2xl font-bold">
              {profile.followers.total}
            </h1>
            <h1 className="text-white text-2xl font-bold">{profile.country}</h1>
            <h1 className="text-white text-2xl font-bold">{profile.product}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
