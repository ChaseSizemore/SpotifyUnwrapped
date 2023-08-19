import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Playlists from './components/Playlist';
import Main from './components/Main';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/main" Component={Main} />
          <Route path="/playlist" Component={Playlists} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
