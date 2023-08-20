import React from 'react';
import axios from 'axios';

const Login = () => {
  const spotifyAuth = () => {
    // window.location.replace('http://localhost:8000/login');
    // window.location.replace('http://spotifyunwrapped-env.eba-fnpwcr3p.us-east-1.elasticbeanstalk.com/login');
    const authURL = process.env.AUTH_URL || 'http://spotifyunwrapped-env.eba-fnpwcr3p.us-east-1.elasticbeanstalk.com/login';
    window.location.replace(authURL);

  };
  
  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome to Spotify Unwrapped!
              </h1>
              <p className="text-gray-700 dark:text-gray-400">
                Login to your Spotify account to get started.
              </p>
              <button onClick={spotifyAuth} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Login</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
