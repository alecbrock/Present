import React, { useState } from "react"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Grid,
  Box,
  Paper,
  IconButton,
  LinearProgress
} from "@mui/material"
import axios from "axios"
import { useSelector } from "react-redux";
import Step from '../components/Step'

const postLifxID = (id) => {
  axios.post('http://localhost:3002/user/lifxID',{lifxID: id},{
    headers: {
      'auth-token': localStorage.token
    }}).then((user) => {
      console.log(user);
    }).catch((err) => {
      console.log(err);
    })
}

const RegisterSteps = (props) => {
  let user = useSelector((state) => state.user);

  let [progress, setProgress] = useState(1);
  const handleProgressAdd = () => {
    if (progress < 5) {
      setProgress(progress += 1)
    }
    console.log(progress)
  }

  const handleProgressSub = () => {
    if (progress > 1) {
      setProgress(progress -= 1)
    }
    console.log(progress)
  }

  const steps = [
    {
      message: `Welcome ${user.name}`
    },
    {
      step: 'Step one',
      imagePath: 'https://cdn.shopify.com/s/files/1/0219/0638/files/LIFX-App---Effects_1500x.jpg?v=1634791704',
      message: 'Setup the lifx lightbulb by installing the lifx app from the appstore'
    },
    {
      step: 'Step two',
      imagePath: 'https://preview.redd.it/75593h8cgpa61.png?width=640&crop=smart&auto=webp&s=5cbda193e1d8e07e7dda0f87dc193a1652a539f1',
      message: 'Go through the prompts in the app, if you cannot find your lightbulb in the app, go to your wifi settings and select the lightbulb'
    },
    {
      step: 'Step three',
      imagePath: 'https://cdn.kustomerhostedcontent.com/media/60671a3a75ed4d96b724b164/43ab6bb06803f7133ec442eeeb3c6c2f.jpg',
      message: 'Once you have setup your lightbulb, you need to find your lightbulbs ID on the intructions',
      function: postLifxID
    },
    {
      message: 'Congratulations you are all set :). There are three pages you can go to located on the sidebar. The first is to control your own lightbulb, the second is to control others lightbulb, and the third is morse code communicating through blinks'
    }
  ]
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 600,
          height: 400,
        },
        justifyContent: 'center',
        alignItems: 'center',

      }}
    >
      <Paper elevation={0} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
          <Step step={steps[progress - 1]} />

            <Grid item xs={1}>
              <IconButton onClick={() => handleProgressSub()}>
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10} style={{ paddingTop: 18 }}>
              <LinearProgress variant="determinate" color="secondary" value={progress * 20} />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => handleProgressAdd()}>
                <ChevronRightIcon />
              </IconButton>
            </Grid>

        </Grid>
      </Paper>
    </Box>
  )
}

export default RegisterSteps