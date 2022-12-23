import React, { useState } from 'react'
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
  Collapse
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

const MessageAlert = (props) => {

  const unAlertTimeout = () => {

    setTimeout(() => {
      if (props.open) return props.setOpen(false)
      if (props.successMessage) return props.setSuccessMessage(false);
    }, 2000)
  }

  return (
    <>
    {localStorage.msg || props.successMessage ? unAlertTimeout() : null }
      <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>

        {localStorage.msg ?
          < Grid item xs={12} sx={{ position: 'absolute', top: 65, width: 400 }}>
            <Collapse in={props.open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      localStorage.removeItem("msg")
                      props.setOpen(false);
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
        {props.successMessage ?
          < Grid item xs={12} sx={{ position: 'absolute', top: 65, width: 400 }}>
            <Collapse in={props.successMessage}>
              <Alert
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      props.setSuccessMessage(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {props.successMessage}
              </Alert>
            </Collapse>
          </Grid> : null
        }
      </Grid >
    </>
  )
}

export default MessageAlert