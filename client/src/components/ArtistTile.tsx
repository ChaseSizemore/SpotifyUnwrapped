import React from 'react';

const ArtistTile = (props: any) => {
  return (
    <div className="flex items-center justify-center text-gray-800 p-2 ">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl">
        <div className="flex items-center p-4 bg-white rounded">
          <div className="flex flex-shrink-0 items-center justify-center h-16 w-16 rounded">
            <img src = {props.image} alt = {props.name}/>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-xl font-bold">{props.artist}</span>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">{props.genres}</span>
              <span className="text-green-500 text-sm font-semibold ml-2">
                {props.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistTile;
