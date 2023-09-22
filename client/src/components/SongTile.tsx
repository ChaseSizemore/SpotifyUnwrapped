import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';

interface SongTileProps {
  key: string;
  songName: string;
  artistName: string;
  albumName: string;
  albumArt: string;
  // onClick: () => void;
}

const StyledImg = styled('img')({
  objectFit: 'cover',
});

const SongTile: React.FC<SongTileProps> = ({ key, songName, artistName, albumName, albumArt,}) => {
  return (
    <>
      <ImageListItem key={key}>
        <StyledImg src={albumArt} alt={songName} />
        <ImageListItemBar
          title={songName}
          subtitle={<span>by: {artistName}</span>}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${songName}`}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    </>
  );
};

export default SongTile;
