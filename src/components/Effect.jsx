import React, { useState } from 'react';
import {
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Alert,
  IconButton,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Slider,
  Collapse,
  Divider,
  Checkbox
} from "@mui/material"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { setExitEffect, removeExitEffect } from '../redux/actions/exitEffectActions'

const Effect = (props) => {
  const dispatch = useDispatch();
  const exitEffect = useSelector((state) => state.exitEffect);
  const user = useSelector((state) => state.user);

  // const [infinite, setInfinite] = useState(false);
  function valuetext(value) {
    return `${value}`;
  }

  //when applying effect then switching to another user and applying effect
  //need to handle boolean differently as it is only made for use of one person
  //maybe put in an error saying need to cancel effect first


  return (
    <>
      <Grid item xs={12} sx={{ minHeight: 440, maxHeight: 440 }}>
        {props.name === 'Candle' ?
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
            <Typography id="input-slider" gutterBottom>
              Intensity
            </Typography>
            <Slider
              aria-label="Brightness"
              value={props.intensity}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              color="secondary"
              step={10}
              marks
              min={10}
              max={100}
              onChange={(e) => props.setIntensity(e.target.value)}
            />
          </Grid> :
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
            <TextField fullWidth label="Input period" onChange={(e) => props.setPeriod(e.target.value)} />
          </Grid>
        }

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
          <TextField fullWidth label={props.cycles ? null : "Input cycle"} value={props.cycles} onChange={(e) => props.setCycles(e.target.value)} />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
          <FormControlLabel control={<Checkbox onChange={() => props.cycles >= 100000 ? props.setCycles('') : props.setCycles(100000)} checked={props.cycles >= 100000} />} label="INFINITY" />
        </Grid>
        {props.name !== 'Candle' ?
          <Grid item xs={12} sx={{ paddingTop: 3 }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography>Effect colors</Typography>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                borderRadius: '16px',
                '& > :not(style)': {
                  m: 1,
                  width: 50,
                  height: 50,
                },
                justifyContent: 'center',
                alignItems: 'center',

              }}
              border={1}
              borderColor='#626161'
            >
              {
                props.colorArray.length ?
                  props.colorArray.map((x, i) => (
                    <Paper key={i} variant={i === props.colorIndex ? "outlined" : null} sx={{ boxShadow: 3, borderWidth: '2px', borderColor: 'white', transition: "transform .2s", backgroundColor: x, "&:hover": { transform: "scale(1.1)", boxShadow: 8 } }} onClick={() => props.handleColorIndex(i)}>
                    </Paper>
                  ))
                  : null
              }
            </Box>
          </Grid> : null}

      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        {
          props.name === "Candle" || props.name === "Cycle" ?
            <Button fullWidth onClick={
              exitEffect.bool === true && exitEffect.location === 'control' ?
                () => {
                  // let obj = Object.assign({}, props.effectError);
                  if (exitEffect.name === props.userSelect) {
                    props.cancelEffect(props.name);
                    dispatch(removeExitEffect());
                  } else {
                    localStorage.setItem("msg", 'Select user with running effect to cancel');
                    props.setOpen(true)
                    // console.log('Select user with running effect to cancel')
                  }

                } :
                () => { console.log(exitEffect.bool, exitEffect.location) }
            } sx={{ color: 'white' }}>Cancel Effect</Button>
            : null}
        <Button fullWidth onClick={
          exitEffect.bool === false ?
            () => {
              if (props.name === "Candle" || props.name === "Cycle") {
                let obj = Object.assign({}, exitEffect);
                obj.bool = true
                obj.location = "control"
                obj.name = props.userSelect
                dispatch(setExitEffect(obj));
                console.log(props.userSelect)
              }
              props.handleEffect(props.name, { period: Number(props.period), cycles: Number(props.cycles), intensity: props.intensity });
            } :
            () => {
              if (props.userSelect !== exitEffect.name) {
                localStorage.setItem("msg", 'Cancel effect for previous user first')
                props.setOpen(true)
              } else {
                localStorage.setItem("msg", 'Cancel previous effect first')
                props.setOpen(true)
              }
            }
        } sx={{ color: "white" }}>Try out effect</Button>
      </Grid>
    </>
  )
}

// {
//   "location": "control",
//   "name": "broxster",
//   "bool": true
// }
// {
//   "location": "control",
//   "name": "broxster",
//   "bool": false
// }


// {
//   "location": 'dashboard',
//   "name": "mint",
//   "bool": true
// }
// {
//   "location": "dashboard",
//   "bool": false
// }


// {
//   "location": "community",
//   "name": "mint",
//   "bool": true
// }
// {
//   "location": "community",
//   "bool": false
// }



// {
//   "location": "control",
//   "name": "broxster",
//   "bool": true
// }
//bool must be false in order to change location or name
//set bool to false
// {
//   "location": "control",
//   "name": "broxster",
//   "bool": false
// }
//proccess of changing name
// {
//   "location": "control",
//   "name": "haleigh",
//   "bool": true
// }

// {
//   "location": "dashboard",
//   "name": "mint",
//   "bool": true
// }





//if breathe or pulse then get rid of cancel effect
//make sure all differences between candle and cycle are different from other effects
//like cancel effect function
//and any boolean

export default Effect

//set effect error in then of request

//this component will return the appropriate details for each filter
//pulse and breathe will use color from the color picker and then period and cycle state
//things like cycle and flame will require conditions to render more or less
//for cycle when user selects cycle and presses the color picker an array or something will be created and then sent up as the multiple states
//the value from the select will be used as the endpoint to hit

//want to create another page for shared community effects and scenes
//there will pagination searching and possible liking to display the top scenes and filters at the top

//user will have a share option on there scene or effect

//need to change all text fields to empty state after being submitted
//in register steps also need to include a success message

//would like to include a possible success message when changing a users light just so that they know it went through
//maybe a small message at the bottom saying success and what was changed

//want to look into set stating at a certain time of the day