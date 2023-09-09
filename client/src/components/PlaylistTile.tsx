
import React from "react";

const PlaylistTile = (props: any) => {
    return (
        <li className='flex flex-row justify-between items-center my-2'>
            <div className='flex flex-row items-center'>
                <img
                    className='w-16 h-16 rounded-full'
                    src={props.playlistImage}
                    alt='playlist cover'
                />
                <div className='ml-5'>
                    <h1 className='text-lg font-bold'>{props.playlistName}</h1>
                    <h2 className='text-sm'>{props.playlistDescription}</h2>
                </div>
            </div>
            <input
                className='mx-5'
                type='checkbox'
                checked={props.isChecked}
                onChange={() => props.handleCheck(props.playlistId)}
            />
        </li>
    );
};

export default PlaylistTile;