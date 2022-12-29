import React, { useState } from 'react'
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
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { setExitEffect, removeExitEffect } from '../redux/actions/exitEffectActions'
import CancelIcon from '@mui/icons-material/Cancel';
import AirIcon from '@mui/icons-material/Air';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CycloneIcon from '@mui/icons-material/Cyclone';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const Scene = (props) => {
  const dispatch = useDispatch();
  const exitEffect = useSelector((state) => state.exitEffect);
  const scenes = Array.isArray(props.scenes) ? props.scenes : Object.keys(props.scenes);
  const dashOrCommunity = Array.isArray(props.scenes);

  return (
    <>
      {/* <CircularProgress/> */}
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#292828',
          boxShadow: 5,
          borderRadius: '16px',
          justifyContent: dashOrCommunity ? 'center' : 'left',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 195,
            height: dashOrCommunity ? 300 : 330,
          },
        }}
      >
        {
          scenes.map((x, i) => {
            let currentScene = dashOrCommunity ? scenes[i] : props.scenes[x];
            let effectBool = Boolean(currentScene.effect);
            let sceneName = dashOrCommunity ? currentScene.name : x;

            return (
              <Paper key={i} sx={{ paddingTop: 1, transition: "transform .2s", "&:hover": { transform: "scale(1.1)", boxShadow: 8 } }}>
                <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="h6">{dashOrCommunity ? currentScene.name : x}</Typography>
                  {
                    currentScene.effect.name === 'Breathe' ?
                      <AirIcon />
                      : currentScene.effect.name === 'Pulse' ?
                        <AutoAwesomeIcon />
                        : currentScene.effect.name === 'Candle' ?
                          <WhatshotIcon />
                          : currentScene.effect.name === 'Cycle' ?
                            <CycloneIcon />
                            : null
                  }

                </Grid>
                <Box
                  sx={{
                    display: 'flex',
                    boxShadow: 5,
                    borderRadius: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 0,
                      width: effectBool && (currentScene.effect.name === 'Breathe' || currentScene.effect.name === 'Pulse') ? 97 : 195,
                      height: 150,
                    },
                  }}
                >
                  <Paper sx={{ backgroundColor: effectBool && (currentScene.effect.name === 'Breathe' || currentScene.effect.name === 'Pulse') ? currentScene.effect.fromColor : currentScene.color, cursor: 'pointer' }} onClick={() => {
                    if (!exitEffect.bool && effectBool) {
                      let obj = Object.assign({}, exitEffect);
                      obj.bool = true
                      obj.location = dashOrCommunity ? 'community' : 'dashboard'
                      obj.name = sceneName
                      dispatch(setExitEffect(obj));
                      // props.setExitEffect(`${dashOrCommunity ? currentScene.name : x}`)
                      props.handleActivateScene(currentScene)
                    } else if (!exitEffect.bool && !effectBool) {
                      props.handleActivateScene(currentScene)
                    } else {
                      localStorage.setItem("msg", 'Cancel scene effect first')
                      props.setOpen(true)
                    }
                  }} />
                  {
                    effectBool && (currentScene.effect.name === 'Breathe' || currentScene.effect.name === 'Pulse') ?

                      <Paper sx={{ backgroundColor: currentScene.effect.color, cursor: 'pointer' }} onClick={() => {
                        if (!exitEffect.bool && effectBool) {
                          let obj = Object.assign({}, exitEffect);
                          obj.bool = true
                          obj.location = dashOrCommunity ? 'community' : 'dashboard'
                          obj.name = sceneName
                          dispatch(setExitEffect(obj));
                          // props.setExitEffect(`${dashOrCommunity ? currentScene.name : x}`)
                          props.handleActivateScene(currentScene)
                        } else if (!exitEffect.bool && !effectBool) {
                          props.handleActivateScene(currentScene)
                        } else {
                          localStorage.setItem("msg", 'Cancel scene effect first')
                          props.setOpen(true)
                        }
                      }} />
                      : null}
                </Box>

                {
                  effectBool ?
                    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Grid item sx={{ display: 'flex', justifyContent: 'center' }} xs={12}>
                        <Typography variant="caption" >{`${currentScene.effect.name} Effect`}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">
                          {currentScene.effect.intensity ?
                            `Intensity: ${currentScene.effect.intensity / 100}` :
                            `Period: ${currentScene.effect.period}`
                          }
                        </Typography>
                      </Grid>
                      {currentScene.effect.cycles >= 100000 ?
                        <Grid item xs={6} sx={{ paddingLeft: 2, paddingTop: .3 }}>
                          <Typography variant="caption" sx={{ paddingTop: 3 }}>
                            <Grid container>

                              <Grid item xs={6}>
                                {`Cycles: `}

                              </Grid>
                              <Grid item xs={6} sx={{ paddingLeft: 1 }} >
                                <AllInclusiveIcon fontSize="small" />
                              </Grid>
                            </Grid>
                          </Typography>
                        </Grid> :
                        <Grid item xs={6} sx={{ paddingLeft: 2 }}>
                          <Typography variant="caption">
                            {`Cycles: ${currentScene.effect.cycles}`}
                          </Typography>
                        </Grid>
                      }
                    </Grid>
                    : null}


                {
                  exitEffect.name === sceneName && exitEffect.bool && ((dashOrCommunity && exitEffect.location === 'community') || (!dashOrCommunity && exitEffect.location === 'dashboard')) ?
                    <Grid container sx={{ alignItems: 'center', height: 28 }} xs={12}>
                      <Grid item xs={10}>
                        <LinearProgress />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton size="small" onClick={() => {
                          dispatch(removeExitEffect(false));
                          props.cancelEffect(currentScene.effect.name);
                        }}>
                          <CancelIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    : null}

                <Grid container sx={{ paddingTop: effectBool ? exitEffect.name === sceneName && exitEffect.bool && ((dashOrCommunity && exitEffect.location === 'community') || (!dashOrCommunity && exitEffect.location === 'dashboard')) ? 0 : 3.5 : 9 }}>

                  <Grid item xs={12}>
                    <Typography variant="caption">Brightness</Typography>
                    <LinearProgress variant="determinate" color="inherit" sx={{ backgroundColor: 'grey' }} value={currentScene.brightness} />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ paddingTop: 1 }} />
                  </Grid>
                  <Grid container sx={{ display: 'flex', justifyContent: 'center' }} xs={12}>
                    {
                      !dashOrCommunity ?
                        <Grid item xs={6}>
                          <Button fullWidth style={{ color: 'white' }} onClick={() => props.handleRemoveScene(dashOrCommunity ? currentScene.name : x)} startIcon={<CloseIcon />} />
                        </Grid>
                        : null}
                    {
                      !dashOrCommunity ?
                        <Grid item xs={6}>
                          <Button fullWidth style={{ color: 'white' }} onClick={() => {
                            const newScene = currentScene;
                            newScene.name = x;
                            props.handleShareScene(newScene)
                          }} startIcon={<SendIcon />} />
                        </Grid> :
                        null}
                  </Grid>

                </Grid>
              </Paper>
            )
          })
        }
      </Box>
    </>
  )
}

export default Scene