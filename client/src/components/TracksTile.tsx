import React from 'react';

const TracksTile = (props: any) => {
  return (
    <div className="flex items-center justify-center text-gray-800 p-2">
      <div className="flex flex-wrap justify-center w-full">
        <div className="flex items-center p-4 bg-white rounded max-w-md w-full">
          <div className="flex flex-shrink-0 items-center justify-center h-12 sm:h-16 w-12 sm:w-16 rounded">
            <img className="object-cover object-center rounded" src={props.image} alt={props.name} />
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-sm sm:text-lg lg:text-xl font-bold">{props.track}</span>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm lg:text-base text-gray-500">{props.artist}</span>
              <span className="text-green-500 text-xs sm:text-sm lg:text-base font-semibold ml-2">
                {props.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracksTile;
