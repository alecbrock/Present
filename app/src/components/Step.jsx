import React, {useState} from 'react';
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

const Steps = (props) => {
  const [id, setId] = useState('');

  return (
    <>
      {props.step.imagePath ?
       <Grid container style={{ dispay: 'flex', alignItems: 'center', justifyContent: 'center', justify: 'center' }}>
        <img
          src={props.step.imagePath}
          alt=''
          style={{ maxWidth: 400, maxHeight: 260}}
        />
      </Grid> :
       null
      }
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        {props.step.message}
      </Grid>
      {!props.step.imagePath ?
      <Grid item xs={12} style={{height: 260}}></Grid>:
      null
      }
      {props.step.function ?
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField size='small' label='Enter lifx ID' onChange={(e) => setId(e.target.value)}></TextField>
        <Button color='secondary' onClick={() => props.step.function(id)}>Submit</Button>
      </Grid> :
      null
    }
    </>
  )
}

export default Steps