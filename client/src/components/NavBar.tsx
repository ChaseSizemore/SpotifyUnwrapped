import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {
  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate('/main');
  };

  const navigateToPlaylists = () => {
    navigate('/playlist');
  };

  const logout = () => {
    Cookies.remove('spotify_access_token');
    window.location.href = "https://www.spotify.com/logout/";

  };

  return (
    <>
      <nav>
        <h1 onClick={navigateToMain}>Main</h1>
        <h1 onClick={navigateToPlaylists}>Playlists</h1>
        <h1 onClick={logout}>Logout</h1>
      </nav>
    </>
  );
};

export default NavBar;
