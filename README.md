# SpotifyUnwrapped

## Description
A website providing Spotify Wrapped data year-round

## Technology Used
- Python (Flask)
- JavaScript/TypeScript (React + React Router)
- TailwindCSS + Material UI
- OAuth 2 (Spotify OAuth + Google OAuth)
- Spotify API
- AWS EB + AWS S3 + CI/CD

## Getting Started on localhost

- Clone the repository

- Set up a .env in the root directory for the backend with the following variables:
> SPOTIFY_CLIENT_ID = 
>
> SPOTIFY_CLIENT_SECRET = 
>
> SPOTIFY_REDIRECT_URI =

- And a .env in the client directory for the frontend with the following variables:

> REACT_APP_AUTH_URL = 


- Start the client side

> cd client
>
> npm start


- Start the server side

> cd backend
>
> python3 application.py


## TO DO
- Profile page data rendering bug as a result of cookie
- Transfer playlsit functionality
