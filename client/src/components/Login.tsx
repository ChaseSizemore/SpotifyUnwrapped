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
    // <>
    // <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
    //   <img src={'https://spotifyunwrapped.s3.amazonaws.com/spotify.png'} className="w-20 pb-10"/>
    //   <button onClick={spotifyAuth}
    //     className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow
    //        hover:translate-y-[-3px] hover:shadow-lg
    //        active:translate-y-[-1px] active:shadow-md"
    //   > Login to Spotify</button>
    // </div>
    // </>
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
        <div className="absolute left-1/2 top-0 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,theme(colors.indigo.100),white)] opacity-20 lg:left-36" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <img
            src={'https://spotifyunwrapped.s3.amazonaws.com/spotify.png'}
            className="w-20 pb-10"
          />
          <button
            onClick={spotifyAuth}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow
             hover:translate-y-[-3px] hover:shadow-lg
             active:translate-y-[-1px] active:shadow-md"
          >
            {' '}
            Login to Spotify
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
