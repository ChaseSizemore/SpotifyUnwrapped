/**
 * Renders the NavBar displayed on all pages except the '/' route or the login page.
 * @returns A React component that displays the Navigation Bar.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillMicFill, BsMusicNoteBeamed } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { MdRecentActors } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';

import SideBarIcon from './SideBarIcon';
import spotify from '../assets/spotify.png'

const NavBar: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth < 768 ? (
        <nav className="fixed top-0 left-0 right-0 h-20 w-screen flex flex-row items-center bg-black z-99">
          <div className="flex flex-row items-center justify-center flex-grow">
            <SideBarIcon icon={<FaUserAlt color="white" className="text-2xl" />} text="Profile" onClick={() => navigate('/main')}/>
            <SideBarIcon icon={<BsFillMicFill color="white" className="text-2xl" />} text="Artists" onClick={() => navigate('/artists')}/>
            <SideBarIcon icon={<BsMusicNoteBeamed color="white" className="text-2xl" />} text="Songs" onClick={() => navigate('/songs')}/>
            <SideBarIcon icon={<MdRecentActors color="white" className="text-2xl" />} text="Playlists" onClick={() => navigate('/playlists')}/>
            <SideBarIcon icon={<BiTransfer color="white" className="text-2xl" />} text="Transfer" onClick={() => navigate('/transfer')}/>
          </div>
        </nav>
      ) : (
        <nav className="fixed top-0 left-0 h-screen w-20 flex flex-col items-center bg-black z-99">
          <div className="flex flex-col items-center w-full pt-4">
            <img src={spotify} className="w-14"/>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow">
            <SideBarIcon icon={<FaUserAlt color="white" className="text-2xl" />} text="Profile" onClick={() => navigate('/main')}/>
            <SideBarIcon icon={<BsFillMicFill color="white" className="text-2xl" />} text="Artists" onClick={() => navigate('/artists')}/>
            <SideBarIcon icon={<BsMusicNoteBeamed color="white" className="text-2xl" />} text="Songs" onClick={() => navigate('/songs')}/>
            <SideBarIcon icon={<MdRecentActors color="white" className="text-2xl" />} text="Playlists" onClick={() => navigate('/playlists')}/>
            <SideBarIcon icon={<BiTransfer color="white" className="text-2xl" />} text="Transfer" onClick={() => navigate('/transfer')}/>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
