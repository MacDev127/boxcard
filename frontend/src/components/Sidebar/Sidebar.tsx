import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AddBox, TableRows } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent">
      <List>
        <ListItem
          component="button"
          onClick={() => navigate('/dashboard/add-boxer')}
        >
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary="Add Boxer" />
        </ListItem>
        <ListItem
          component="button"
          onClick={() => navigate('/dashboard/manage-boxer')}
        >
          <ListItemIcon>
            <TableRows />
          </ListItemIcon>
          <ListItemText primary="Manage Boxers" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
