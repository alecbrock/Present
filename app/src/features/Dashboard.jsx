import React, { useState, useEffect } from "react"
import axios from 'axios'
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
  IconButton,
  LinearProgress,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Slider,
  Collapse
} from "@mui/material"
import { useSelector } from "react-redux";
import Post from "../ApiPost"

//will have default warm colors
//if no recent colors then display default colors hard coded in react
//on the right side will be the scenes

const paperSX = {
  boxShadow: 3,
  backgroundColor: 'red',
  "&:hover": {
    boxShadow: 8,
  },
};

const whiteTheme = [
  {
    kelvin: "2000",
    color: '#FF8A12'
  },
  {
    kelvin: "2500",
    color:'#FFA148'
  },
  {
    kelvin: "2700",
    color: '#FFA957'
  },
  {
    kelvin: "3000",
    color: '#FFB46B'
  },
  {
    kelvin: "3500",
    color: '#FFC489'
  },
  {
    kelvin: "4000",
    color: '#FFD1A3'
  },
  {
    kelvin: "4500",
    color: '#FFDBBA'
  },
  {
    kelvin: "5000",
    color: '#FFE4CE'
  },
  {
    kelvin: "5600",
    color: '#FFEEE3'
  },
  {
    kelvin: "6000",
    color: '#FFF3EF'
  },
  {
    kelvin: "6500",
    color: '#FFF9FD'
  },
  {
    kelvin: "7000",
    color: '#F5F3FF'
  },
  {
    kelvin: "7500",
    color: '#EBEEFF'
  },
  {
    kelvin: "8000",
    color: '#E3E9FF'
  },
  {
    kelvin: "9000",
    color: '#D6E1FF'
  }
]


const Dashboard = (props) => {
  props.authPost();
  const user = useSelector((state) => state.user);

  const handleColor = (color) => {
    Post('http://localhost:3002/lifx/dash_color', { color: color }).then((user) => {

    }).catch((error) => {

    })
  };

  const handleKelvin = (kelvin) => {
    Post('http://localhost:3002/lifx/dash_kelvin', {kelvin: kelvin}).then((user) => {

    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">Recent colors</Typography>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              backgroundColor: '#292828',
              boxShadow: 5,
              borderRadius: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 116,
                height: 116,
              },
            }}
          >

            {user.recentColors ?
              user.recentColors.map((x, i) => (
                <Paper key={i} sx={{ boxShadow: 3, transition: "transform .2s", backgroundColor: x, "&:hover": { transform: "scale(1.1)", boxShadow: 8 } }} onClick={() => { handleColor(x) }} />
              )) :
              null
            }
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">Whites</Typography>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              backgroundColor: '#292828',
              boxShadow: 5,
              borderRadius: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 116,
                height: 116,
              },
            }}
          >

            {
              whiteTheme.map((x, i) => (
                <Paper key={i} sx={{ boxShadow: 3, transition: "transform .2s", backgroundColor: x.color, "&:hover": { transform: "scale(1.1)", boxShadow: 8 } }} onClick={() => { handleKelvin(x.kelvin) }} />
              ))
            }
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard