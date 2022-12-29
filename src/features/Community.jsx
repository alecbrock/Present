import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import Scene from '../components/Scene'
import Post from "../ApiPost"
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
  Pagination
} from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { setCommunityScenes } from '../redux/actions/communityScenesActions';
import MessageAlert from "../components/MessageAlert"

const Community = (props) => {
  props.authPost();
  const dispatch = useDispatch();
  const communityScenes = useSelector((state) => state.communityScenes);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(false);
  // const [exitEffect, setExitEffect] = useState(false);

  const handleActivateScene = (scene) => {
    Post('/lifx/activate_scene', {
      scene: scene
    }).then((obj) => {
    }).catch((error) => {
      setOpen(true)
    })
  }

  const cancelEffect = (name) => {
    Post(`/lifx/cancel_effect`, {
      username: user.name,
      effectName: name
    }).then((result) => {
      setSuccessMessage('Succesfully canceled effect')
    }).catch((error) => {
      setOpen(true)
    })
  }

  const handlePage = (pageInt) => {
    let newPageNum = page === 1 && pageInt < 0 ? 1 : communityScenes.length ? page + pageInt : pageInt < 0 ? page + pageInt : page;
    setPage(newPageNum)
    console.log(newPageNum);
    Post('/community/community_page', {
      pageNumber: newPageNum,
      nPerPage: 12,
      name: search ? search : false
    }).then((result) => {
      dispatch(setCommunityScenes(result.user))
    }).catch((error) => {
      setOpen(true)
    })
  }

  const handleSearchCommunity = () => {
    Post('/community/find_community_scenes', {
      pageNumber: 1,
      nPerPage: 12,
      name: search
    }).then((result) => {
      dispatch(setCommunityScenes(result.user))
    }).catch((error) => {
      setOpen(true)
    })
  }

  return (
    <>
      <MessageAlert open={open} setOpen={setOpen} successMessage={successMessage} setSuccessMessage={setSuccessMessage} />
      <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

          <TextField
            label="Enter scene name"
            id="standard-size-small"
            size="small"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            sx={{ paddingBottom: 1 }}
          />
          <Button variant="outlined" size="small" color="secondary" sx={{ height: 40 }} onClick={handleSearchCommunity}>Search scene</Button>
        </Grid>
        <Grid item xs={12}>

          {
            JSON.stringify(communityScenes) !== '[]' ?
              <Scene scenes={communityScenes} handleActivateScene={handleActivateScene} cancelEffect={cancelEffect} setOpen={setOpen} />
              : null
          }
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

          <IconButton color="primary" aria-label="add to shopping cart" onClick={() => handlePage(-1)}>
            <KeyboardArrowLeftIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={() => handlePage(1)}>
            <KeyboardArrowRightIcon sx={{ color: 'white' }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}

export default Community