// AdminDashboard.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Box, Toolbar } from '@mui/material';

const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
