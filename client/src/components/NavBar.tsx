import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillMicFill, BsMusicNoteBeamed } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { MdRecentActors } from 'react-icons/md';

import SideBarIcon from './SideBarIcon';

const NavBar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 h-screen w-20 flex flex-col items-center bg-black">
        <div className="flex flex-col items-center w-full pt-4">
          <img src={'https://spotifyunwrapped.s3.amazonaws.com/spotify.png'} className="w-14"/>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow">
          <SideBarIcon icon={<FaRegUser color="white" className="text-2xl" />} text="Profile" onClick={() => navigate('/main')} />
          <SideBarIcon icon={<BsFillMicFill color="white" className="text-2xl" />} text="Artists" onClick={() => navigate('/artists')} />
          <SideBarIcon icon={<BsMusicNoteBeamed color="white" className="text-2xl" />} text="Songs" onClick={() => navigate('/songs')} />
          <SideBarIcon icon={<MdRecentActors color="white" className="text-2xl" />} text="Playlists" onClick={() => navigate('/playlists')} />


        </div>
      </nav>
    </>
  );
};

export default NavBar;
