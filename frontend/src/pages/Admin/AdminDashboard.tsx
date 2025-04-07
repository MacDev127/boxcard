import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, Toolbar } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        {/* You can place your Sidebar component here */}
        <Sidebar />
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* This Outlet renders whatever your current nested route is */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
