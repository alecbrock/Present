import React, { useState } from "react"
import {
  Grid,
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  LinearProgress,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material"
import { useSelector } from "react-redux";
import Post from "../ApiPost"
import CloseIcon from '@mui/icons-material/Close'
import { updateUserScene } from '../redux/actions/userActions'
import { useDispatch } from "react-redux"


const whiteTheme = [
  {
    kelvin: "2000",
    color: '#FF8A12'
  },
  {
    kelvin: "2500",
    color: '#FFA148'
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);


  const handleColor = (color) => {
    Post('https://past-alec.herokuapp.com/lifx/dash_color', { color: color }).then((user) => {
    }).catch((error) => {
      setOpen(true)
    })
  };

  const handleKelvin = (kelvin) => {
    Post('https://past-alec.herokuapp.com/lifx/dash_kelvin', { kelvin: kelvin }).then((user) => {
    }).catch((error) => {
      setOpen(true)
    })
  }

  const handleRemoveScene = (sceneName) => {
    Post('https://past-alec.herokuapp.com/user/remove_scene', { sceneName: sceneName }).then((obj) => {
      dispatch(updateUserScene(obj.user))
    }).catch((error) => {
      setOpen(true)
    })
  }

  const handleActivateScene = (scene) => {
    Post('https://past-alec.herokuapp.com/lifx/activate_scene', { scene: scene }).then((obj) => {
    }).catch((error) => {
      setOpen(true)
    })
  }

  return (
    <>
      <Grid container>
        {localStorage.msg ?
          <Grid item xs={12}>
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      localStorage.removeItem("msg")
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {localStorage.msg}
              </Alert>
            </Collapse>
          </Grid> :
          null}
        <Grid item xs={6}>

          <Grid item xs={12}>
            <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
              {user.recentColors ?
                <Typography variant="h6">Recent colors</Typography> :
                null}
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
          <Grid item xs={12}>
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

        <Grid item xs={6} sx={{ paddingLeft: 3 }}>
          <Grid item xs={12}>
            <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
              {JSON.stringify(user.scenes) !== '{}' && user ? <Typography variant="h6">Scenes</Typography> :
                null}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                backgroundColor: '#292828',
                boxShadow: 5,
                borderRadius: '16px',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 195,
                  height: 330,
                },
              }}
            >

              {JSON.stringify(user.scenes) !== '{}' && user ?
                Object.keys(user.scenes).map((x, i) => {
                  return (
                    <Paper key={i} sx={{ paddingTop: 1, transition: "transform .2s", "&:hover": { transform: "scale(1.1)", boxShadow: 8 } }}>
                      <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6">{x}</Typography>
                      </Grid>
                      <Box
                        sx={{
                          display: 'flex',
                          boxShadow: 5,
                          borderRadius: '16px',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                          '& > :not(style)': {
                            m: 1,
                            width: 195,
                            height: 150,
                          },
                        }}
                      >
                        <Paper sx={{ backgroundColor: user.scenes[x].color, cursor: 'pointer' }} onClick={() => handleActivateScene(user.scenes[x])} />
                      </Box>
                      <Grid item sx={{ paddingTop: 3 }} xs={12}>
                        <Typography variant="caption">Brightness</Typography>
                        <LinearProgress variant="determinate" color="inherit" sx={{ backgroundColor: 'grey' }} value={user.scenes[x].brightness} />
                      </Grid>
                      <Divider sx={{ paddingTop: 4 }} />
                      <Grid item sx={{ display: 'flex', justifyContent: 'center' }} xs={12}>
                        <Button fullWidth style={{ color: 'white' }} onClick={() => handleRemoveScene(x)} startIcon={<CloseIcon />} />
                      </Grid>
                    </Paper>
                  )
                })
                : null}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard