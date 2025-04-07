import React from 'react';
import logo from '../../images/logo.png';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper: returns true if current path starts with given path
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <Drawer id="drawer" variant="permanent">
      <List>
        <div className="logo">
          <ListItemButton id="button" component="div">
            <img src={logo} alt="Logo" />
          </ListItemButton>
        </div>
        <ListItemButton
          id="button"
          onClick={() => navigate('/dashboard/add-boxer')}
          selected={isActive('/dashboard/add-boxer')}
          sx={{
            // When selected, override colors of inner text and icons.
            '&.Mui-selected': {
              backgroundColor: 'rgba(106, 158, 237, 0.2)',
              '& .MuiListItemText-root': { color: '#6a9eed' },
              '& .MuiSvgIcon-root': { color: '#6a9eed' },
            },
            '&.Mui-selected:hover': {
              backgroundColor: 'rgba(106, 158, 237, 0.2)',
            },
          }}
        >
          <ListItemIcon
            id="button-icon"
            sx={{ color: 'white' }} // default icon color
          >
            <PersonAddAlt1Icon style={{ fontSize: '30px' }} />
          </ListItemIcon>
          <ListItemText
            primary="Add Boxer"
            sx={{
              color: isActive('/dashboard/add-boxer') ? '#6a9eed' : 'white',
            }}
          />
        </ListItemButton>
        <ListItemButton
          id="button"
          onClick={() => navigate('/dashboard/manage-boxer')}
          selected={isActive('/dashboard/manage-boxer')}
          sx={{
            '&.Mui-selected': {
              backgroundColor: 'rgba(106, 158, 237, 0.2)',
              '& .MuiListItemText-root': { color: '#6a9eed' },
              '& .MuiSvgIcon-root': { color: '#6a9eed' },
            },
            '&.Mui-selected:hover': {
              backgroundColor: 'rgba(106, 158, 237, 0.2)',
            },
          }}
        >
          <ListItemIcon
            id="button-icon"
            sx={{ color: 'white' }} // default icon color
          >
            <ManageSearchIcon style={{ fontSize: '30px' }} />
          </ListItemIcon>
          <ListItemText
            primary="Manage Boxers"
            sx={{
              color: isActive('/dashboard/manage-boxer') ? '#6a9eed' : 'white',
            }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
