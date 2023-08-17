import React from 'react';
import axios from 'axios';

const Login = () => {
  const spotifyAuth = () => {
    window.location.replace('http://localhost:8000/login')
  };
  return (
    <>
      <button onClick={spotifyAuth}>Login</button>
    </>
  );
};

export default Login;
