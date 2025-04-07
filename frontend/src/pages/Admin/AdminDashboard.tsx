import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
