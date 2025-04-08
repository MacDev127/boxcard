import React, { useState } from 'react';
import logo from '../../images/logo.png';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // true for screens smaller than "sm"
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Helper: returns true if current path starts with given path.
  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar (drawer) content to be reused between mobile & permanent
  const drawerContent = (
    <List>
      <div id="logo">
        {/* Not clickable if it doesn't need to be */}
        <ListItem component="div">
          <img src={logo} alt="Logo" />
        </ListItem>
      </div>
      <ListItemButton
        id="button"
        onClick={() => {
          navigate('/dashboard/add-boxer');
          if (isMobile) setMobileOpen(false);
        }}
        selected={isActive('/dashboard/add-boxer')}
        sx={{
          // When selected, persist the background and change colors.
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
        <ListItemIcon id="button-icon" sx={{ color: 'white' }}>
          <PersonAddAlt1Icon style={{ fontSize: '28px' }} />
        </ListItemIcon>
        <ListItemText
          primary="Add Boxer"
          sx={{ color: isActive('/dashboard/add-boxer') ? '#6a9eed' : 'white' }}
        />
      </ListItemButton>
      <ListItemButton
        id="button"
        onClick={() => {
          navigate('/dashboard/manage-boxer');
          if (isMobile) setMobileOpen(false);
        }}
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
        <ListItemIcon id="button-icon" sx={{ color: 'white' }}>
          <ManageSearchIcon style={{ fontSize: '28px' }} />
        </ListItemIcon>
        <ListItemText
          id="button-text"
          primary="View Boxers"
          sx={{
            color: isActive('/dashboard/manage-boxer') ? '#6a9eed' : 'white',
          }}
        />
      </ListItemButton>
    </List>
  );

  return (
    <>
      {/* Temporary drawer for mobile screens */}
      {isMobile && (
        <>
          {/* A menu button to toggle the drawer */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, mt: 2, display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      )}

      {/* Permanent drawer for larger screens */}
      <Drawer
        id="drawer"
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
