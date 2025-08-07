import React, { useState } from 'react';
import logo from '../../images/logo.png';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery('(max-width:768px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerPaperSx = {
    boxSizing: 'border-box',
    width: drawerWidth,
    backgroundColor: '#272e3c',
  };

  // Sidebar content
  const drawerContent = (
    <List sx={{ padding: 0, marginLeft: '10px' }}>
      <div id="logo">
        <Link href="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Dashboard */}
      <ListItemButton
        onClick={() => {
          navigate('/dashboard/analytics');
          if (isMobile) setMobileOpen(false);
        }}
        selected={isActive('/dashboard/analytics')}
        sx={{
          marginX: '8px',
          cursor: 'pointer',

          marginY: '4px',
          borderRadius: '8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(106, 158, 237, 0.2)',
            '& .MuiListItemText-root': { color: '#6a9eed' },
            '& .MuiSvgIcon-root': { color: '#6a9eed' },
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(106, 158, 237, 0.2)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.06)',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'white' }}>
          <SpaceDashboardIcon style={{ fontSize: '28px' }} />
        </ListItemIcon>
        <ListItemText
          primary="Dashboard"
          sx={{ color: isActive('/dashboard/analytics') ? '#6a9eed' : 'white' }}
        />
      </ListItemButton>

      {/* Add Boxer */}
      <ListItemButton
        onClick={() => {
          navigate('/dashboard/add-boxer');
          if (isMobile) setMobileOpen(false);
        }}
        selected={isActive('/dashboard/add-boxer')}
        sx={{
          marginX: '8px',
          marginY: '4px',
          cursor: 'pointer',

          borderRadius: '8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(106, 158, 237, 0.2)',
            '& .MuiListItemText-root': { color: '#6a9eed' },
            '& .MuiSvgIcon-root': { color: '#6a9eed' },
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(106, 158, 237, 0.2)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.06)',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'white' }}>
          <PersonAddAlt1Icon style={{ fontSize: '28px' }} />
        </ListItemIcon>
        <ListItemText
          primary="Add Boxer"
          sx={{ color: isActive('/dashboard/add-boxer') ? '#6a9eed' : 'white' }}
        />
      </ListItemButton>

      {/* Add Contest */}
      <ListItemButton
        onClick={() => {
          navigate('/dashboard/add-contest');
          if (isMobile) setMobileOpen(false);
        }}
        selected={isActive('/dashboard/add-contest')}
        sx={{
          marginX: '8px',
          marginY: '4px',
          cursor: 'pointer',

          borderRadius: '8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(106, 158, 237, 0.2)',
            '& .MuiListItemText-root': { color: '#6a9eed' },
            '& .MuiSvgIcon-root': { color: '#6a9eed' },
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(106, 158, 237, 0.2)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.06)',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'white' }}>
          <SportsKabaddiIcon style={{ fontSize: '28px' }} />
        </ListItemIcon>
        <ListItemText
          primary="Add Contest"
          sx={{ color: isActive('/dashboard/add-boxer') ? '#6a9eed' : 'white' }}
        />
      </ListItemButton>

      {/* Manage Boxers */}
      <ListItemButton
        onClick={() => {
          navigate('/dashboard/manage-boxer');
          if (isMobile) setMobileOpen(false);
        }}
        selected={isActive('/dashboard/manage-boxer')}
        sx={{
          marginX: '8px',
          cursor: 'pointer',
          marginY: '4px',
          borderRadius: '8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(106, 158, 237, 0.2)',
            '& .MuiListItemText-root': { color: '#6a9eed' },
            '& .MuiSvgIcon-root': { color: '#6a9eed' },
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(106, 158, 237, 0.2)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.06)',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'white' }}>
          <ManageSearchIcon style={{ fontSize: '28px' }} />
        </ListItemIcon>
        <ListItemText
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
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            color: '#ffffff',
            zIndex: 1300,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Temporary drawer for mobile screens */}
      <Drawer
        variant="temporary"
        open={mobileOpen && isMobile}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': drawerPaperSx,
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Permanent drawer for desktop screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': drawerPaperSx,
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
