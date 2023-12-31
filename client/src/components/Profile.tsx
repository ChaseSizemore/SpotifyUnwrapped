import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import {
  ProfileType,
  getProfile,
  getNumArtists,
  getNumPlaylists,
  logout,
  getTopGenres,
} from '../util/spotifyAPICalls';

import spotify from '../assets/spotify.png';
import { get } from 'http';

const Profile = () => {
  const location = useLocation();
  const initialCookieValue = Cookies.get('spotify_access_token');
  const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileType>({
    display_name: '',
    followers: { total: 0 },
    images: [],
    country: '',
    product: '',
  });
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [numArtists, setNumArtists] = useState<any>(null);
  const [numPlaylists, setNumPlaylists] = useState<number>(0);
  const [topGenres, setTopGenres] = useState<any>(null);

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

  const getParamsAndSetCookie = () => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('access_token');
    if (accessToken) {
      setCookie(accessToken);
      Cookies.set('spotify_access_token', accessToken);
    }
  };

  useEffect(() => {
    getParamsAndSetCookie();
  }, []);

  useEffect(() => {
    Promise.all([
      getProfile(),
      getNumArtists(),
      getNumPlaylists(),
      getTopGenres(),
    ])
      .then(([profileData, numArtists, numSongs, genres]) => {
        setProfile(profileData);
        console.log(profileData);
        setNumArtists(numArtists);
        setNumPlaylists(numSongs);
        setTopGenres(genres);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [cookie]);

  if (!profile) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <div
            className={`w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin ${
              windowWidth >= 768 ? 'ml-20' : 'mt-20'
            }`}
          ></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <div
            className={`flex flex-col items-center ${
              windowWidth >= 768 ? 'ml-20' : 'mt-20'
            }`}
          >
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={
                profile &&
                profile.images &&
                profile.images[0] &&
                profile.images[0].url
                  ? profile.images[0].url
                  : spotify
              }
              alt="profile picture"
            />
            <h5 className="mb-1 text-xl font-medium text-black">
              {profile.display_name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {profile.followers.total} Followers ~ {numArtists} Artists
              Followed ~ {numPlaylists} Playlists
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {profile.country}{' '}
              {profile.product.charAt(0).toUpperCase() +
                profile.product.slice(1)}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <a
                href="#"
                onClick={() => {
                  logout();
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
