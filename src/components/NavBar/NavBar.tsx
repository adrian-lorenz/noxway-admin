import { useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import BarChart from '@mui/icons-material/BarChart';
import GateWay from '@mui/icons-material/SettingsApplications';
import EndPoint from '@mui/icons-material/SwitchAccessShortcut';
import Logs from '@mui/icons-material/List';
import Events from '@mui/icons-material/Event';
import LogOut from '@mui/icons-material/Logout';

import SpaceDivider from '../Mui/Tools/Divider';

function NavBar(){
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  function handleClick(site: any) {
    navigate(site);
  }

  const list = () => (
    <div role="presentation">
      <List>
        <SpaceDivider />
        <ListItemButton onClick={() => handleClick('/web/dashboard')}>
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <SpaceDivider />

        <ListItemButton onClick={() => handleClick('/web/gateway')}>
          <ListItemIcon>
            <GateWay />
          </ListItemIcon>
          <ListItemText primary="Gateway" />
        </ListItemButton>

        <ListItemButton onClick={() => handleClick('/web/endpoints')}>
          <ListItemIcon>
            <EndPoint />
          </ListItemIcon>
          <ListItemText primary="Endpoints" />
        </ListItemButton>

        <ListItemButton onClick={() => handleClick('/web/logs')}>
          <ListItemIcon>
            <Logs />
          </ListItemIcon>
          <ListItemText primary="Logs" />
        </ListItemButton>

        <ListItemButton disabled onClick={() => handleClick('/web/events')}>
          <ListItemIcon>
            <Events />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItemButton>
        <SpaceDivider />
        <SpaceDivider />
        <SpaceDivider />
        <SpaceDivider />
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogOut />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' } }}
    >
      {list()}
    </Drawer>
  );
}

export default NavBar;
