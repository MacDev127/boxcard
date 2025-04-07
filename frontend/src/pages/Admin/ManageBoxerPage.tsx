import React from 'react';
import BoxersTable from '../../components/AdminTable/AdminTable';
import { Typography } from '@mui/material';

const ManageBoxerPage: React.FC = () => (
  <>
    <Typography variant="h5" gutterBottom>
      Manage Boxers
    </Typography>
    <BoxersTable />
  </>
);

export default ManageBoxerPage;
