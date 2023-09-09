import React from 'react';

interface SongTileProps {
  key: string;
  songName: string;
  artistName: string;
  albumName: string;
  albumArt: string;
  // onClick: () => void;
}

const SongTile: React.FC<SongTileProps> = ({ key, songName, artistName, albumName, albumArt,}) => {
  return (
    <li className="flex flex-row border py-4">
      <div className='flex flex-row'>
        <img src={albumArt} className="w-14" />
        <div>
          <h1 className="text-black text-sm">{songName}</h1>
          <h1 className="text-black text-sm">{artistName} - {albumName} </h1>
        </div>
      </div>
      <h1 className="text-black text-sm">{key}</h1>
    </li>
  );
};

export default SongTile;
