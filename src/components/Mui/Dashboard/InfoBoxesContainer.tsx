import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface InfoBoxesContainerProps {
  children: ReactNode;
}

const InfoBoxesContainer: React.FC<InfoBoxesContainerProps> = ({ children }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
      flexWrap: 'wrap',
    }}>
      {children}
    </Box>
  );
};

export default InfoBoxesContainer;
