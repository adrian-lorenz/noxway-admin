import React from 'react';
import { Box, Typography } from '@mui/material';

interface InfoBoxProps {
  caption: string;
  value: string | number;
  unit: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ caption, value, unit }) => {
  return (
    <Box sx={{
      width: 200, // Feste Breite
      height: 200, // Feste Höhe
      padding: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Zentriert den Inhalt vertikal
      gap: '8px',
    }}>
      <Typography variant="subtitle1" component="div" sx={{ fontSize: '16px' }}>
        {caption}
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontSize: '32px', fontWeight: 'bold' }}>
        Ø {value}
      </Typography>
      <Typography variant="body2" component="div" sx={{ fontSize: '14px' }}>
        {unit}
      </Typography>
    </Box>
  );
};

export default InfoBox;
