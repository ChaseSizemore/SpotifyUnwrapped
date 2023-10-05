import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Playlists from './components/Playlist';
import Profile from './components/Profile';
import Songs from './components/Songs';
import Artists from './components/Artists';
import Success from './components/SuccessPage';
import TransferPage from './components/TransferPage';
import ErrorPage from './components/Error';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/main" Component={Profile} />
          <Route path="/artists" Component={Artists} />
          <Route path="/songs" Component={Songs} />
          <Route path="/playlists" Component={Playlists} />
          <Route path="/success" Component={Success} />
          <Route path="/transfer" Component={TransferPage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
