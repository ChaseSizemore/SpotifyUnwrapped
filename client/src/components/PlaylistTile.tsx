
import React from "react";

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


interface PlaylistTileProps {
    key: string;
    playlistName: string;
    playlistArt: string;
    playlistID: string;
}

const PlaylistTile: React.FC<PlaylistTileProps> = ({ key, playlistName, playlistArt, playlistID }) => {
    return (
        <>
            <ImageListItem key={key}>
                <img src={playlistArt} alt={playlistName} />
                <ImageListItemBar
                    title={playlistName}
                    actionIcon={
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${playlistName}`}
                        >
                            {/* <InfoIcon /> */}
                        </IconButton>
                    }
                />
            </ImageListItem>
        </>
    );
}
export default PlaylistTile;