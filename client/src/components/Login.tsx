import React from 'react';
import axios from 'axios';
import Logo from '../../public/spotify.png';

const Login = () => {
  const spotifyAuth = () => {
    const authURL =
      process.env.REACT_APP_AUTH_URL ||
      'http://spotifyunwrapped-env.eba-fnpwcr3p.us-east-1.elasticbeanstalk.com/login';
    window.location.replace(authURL);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <img src={'https://spotifyunwrapped.s3.amazonaws.com/spotify.png'} className="w-20 pb-10"/>
        <button onClick={spotifyAuth}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow 
             hover:translate-y-[-3px] hover:shadow-lg 
             active:translate-y-[-1px] active:shadow-md"
        > Login to Spotify</button>
      </div>
    </>
  );
};

export default Login;
