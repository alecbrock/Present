import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
// import AppBar from '@mui/material/AppBar';


import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileMenu from './ProfileMenu';

import {
  Grid,
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Paper,
  Typography,
  Alert,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Avatar
} from "@mui/material"

import axios from 'axios';
import { useSelector } from "react-redux";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);






export default function Appbar(props) {
  const theme = useTheme();
  const { children } = props
  let user = useSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="secondary" component={Link} to="/" variant="text">INPUT TITLE</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="secondary" component={Link} to={"/Login"} onClick={localStorage.token ? () => {
              localStorage.removeItem("token");
              window.location.href = "/Login";
            } :
              null
            }>
              {localStorage.token ? "Logout" : "Login"}
            </Button>
            {user.name ?
              <ProfileMenu username={user.name}/> :
              <Avatar src="/broken-image.jpg" />
            }

          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>

          <ListItem button component={Link} to={"/connect_self"}>
            <ListItemIcon>
              <SettingsInputCompositeIcon />
            </ListItemIcon>
            <ListItemText primary={"Connect"} />
          </ListItem>

          <ListItem button component={Link} to={"/connect_other"}>
            <ListItemIcon>
              <SettingsInputCompositeIcon />
            </ListItemIcon>
            <ListItemText primary={"Connect to other"} />
          </ListItem>

          <ListItem button component={Link} to={"/morse_communication"}>
            <ListItemIcon>
              <SettingsInputCompositeIcon />
            </ListItemIcon>
            <ListItemText primary={"Morse"} />
          </ListItem>

        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box >
  )
}