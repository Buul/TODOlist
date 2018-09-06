import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';

const mailFolderListItems = (
  <div>
    <ListItem
      button
      onClick={() => {
        window.location.href = '#/dashboard';
      }}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem
      button
      onClick={() => {
        window.location.href = '#/todo';
      }}
    >
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Todo" />
    </ListItem>
  </div>
);

export default mailFolderListItems;
