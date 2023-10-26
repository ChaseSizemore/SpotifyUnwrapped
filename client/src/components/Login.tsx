/**
 * Renders a login button that redirects the user to the Spotify authentication route (which if valid, redirects to /main (or the profile component)).
 * @returns A React component that displays a login button.
 */

import React from 'react';
import image from '../assets/spotify.png';


const Login = () => {

  /**
   * Redirects the user to the Spotify authentication URL.
   * @returns void
   */
  const spotifyAuth = () => {
    const authURL =
      process.env.REACT_APP_AUTH_URL ||
      'https://spotify-unwrapped-backend.vercel.app/login';
    window.location.replace(authURL);
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
        <div className="absolute left-1/2 top-0 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,theme(colors.indigo.100),white)] opacity-20 lg:left-36" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <img
            src={image}
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
