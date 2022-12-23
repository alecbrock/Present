import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import Post from '../ApiPost';
import {  updateUserProfileColor } from '../redux/actions/userActions'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"

export default function ProfileMenu(props) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [colorOpen, setColorOpen] = useState(false);
  const [color, setColor] = useState('');
  const [value, setValue] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColor = (color) => {
    Post('/user/profile_color', {color: color.hex}).then((result) => {
      console.log(result.user.profileColor)
      dispatch(updateUserProfileColor(result.user))
      setColor(color.hex);
    }).catch((error) => {
      setValue(!value)
    })
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Profile settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar style={{ backgroundColor: user.profileColor, color: 'white' }}>{`${props.username[0]}${props.username[1]}`}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to={'register_steps'}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Register lifx
        </MenuItem>
        <MenuItem onMouseEnter={() => setColorOpen(true)} onMouseLeave={() => setColorOpen(false)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Profile color
        </MenuItem>
        {
          colorOpen ?
            <div onMouseEnter={() => setColorOpen(true)} onMouseLeave={() => setColorOpen(false)}>
              <ChromePicker color={color} onChangeComplete={handleColor}/>
            </div> :
            null
        }
      </Menu>
    </React.Fragment>
  );
}