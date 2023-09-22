import React from 'react';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';


interface ArtistTileProps {
  key: string;
  artistName: string;
  artistArt: string;
}

const StyledImg = styled('img')({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

const ArtistTile: React.FC<ArtistTileProps> = ({ key, artistName, artistArt }) => {
  return (
    <>
      <ImageListItem key={key}>
        <StyledImg src={artistArt} alt={artistName} />
        <ImageListItemBar
          title={artistName}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${artistName}`}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    </>
  );
}
export default ArtistTile;
