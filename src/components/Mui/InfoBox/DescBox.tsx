import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import GetLng from '../Language/GetLng';

interface DescBoxProps {
  title: number;
  description: number;
}

const DescBox: React.FC<DescBoxProps> = ({ title, description }) => {
  return (
    <Box
      display="flex"
      gap={1}
      sx={{
        marginBottom: '15px',
        background: '#f0f0f0',
        padding: '10px',
        borderRadius: '8px',
      }}>
      <Tooltip title="Mehr Informationen">
        <InfoIcon color="primary" />
      </Tooltip>

      <Typography variant="body1"><b>{GetLng(title)}:</b> {GetLng(description)}</Typography>
    </Box>
  );
};

export default DescBox;
