import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface StyledBoxProps {
  children: ReactNode;
}

const StyledBox: React.FC<StyledBoxProps> = ({ children }) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'grey.300',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 2,
        boxShadow: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default StyledBox;
