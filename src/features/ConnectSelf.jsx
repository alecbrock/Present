import React, { useState } from "react"
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
import { PhotoshopPicker } from 'react-color'
import Post from "../ApiPost"
import { updateUserRecentColor, updateUserScene } from '../redux/actions/userActions'
import { updateLifxPower } from '../redux/actions/lifxStateActions'

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";



function valuetext(value) {
    return `${value}`;
}

const onOrOff = (str) => {
    if (str === "on") {
        return true;
    } else if (str === "off") {
        return false;
    }
}


const ConnectSelf = (props) => {

    props.authPost();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const lifxState = useSelector((state) => state.lifxState);

    const [searchUser, setSearchUser] = useState('');
    const [colors, setColor] = useState(false);
    const [brightness, setBrightness] = useState(null);
    const [userSelect, setUserSelect] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [sceneName, setSceneName] = useState('');

    const toggleLight = (str) => {
        dispatch(updateLifxPower(str))
        Post('https://past-alec.herokuapp.com/lifx/toggle', { username: userSelect ? userSelect : user.name ? user.name : '' }).then(() => {
        }).catch((error) => {
            setOpen(true)
        })
    }

    const handleColor = (color) => {
        setColor(color);
        Post('https://past-alec.herokuapp.com/lifx/color', { color: color.hex, username: userSelect ? userSelect : user.name ? user.name : '' }).then((result) => {
            dispatch(updateUserRecentColor(result.user));
        }).catch((error) => {
            setOpen(true)
        })
    };

    const handleBrightness = (e) => {
        if (brightness !== e.target.value) {
            setBrightness(e.target.value)
            Post('https://past-alec.herokuapp.com/lifx/brightness', { brightness: e.target.value, username: userSelect ? userSelect : user.name ? user.name : '' }).then(() => {
            }).catch((error) => {
                setOpen(true)
            })
        }
    }

    const handleSearchUser = (e) => {
        if (e.keyCode === 13) {
            Post('https://past-alec.herokuapp.com/user/search_user', { searchedUsername: searchUser }).then((result) => {
                setSuccessOpen(true);
            }).catch((error) => {
                setOpen(true)
            })
        }
    }

    const handleScene = () => {
        Post('https://past-alec.herokuapp.com/user/add_scene', {
            [sceneName]: {
                color: colors.hex,
                brightness: brightness
            }
        }).then((result) => {
            dispatch(updateUserScene(result.user))
        }).catch((error) => {
            setOpen(true)
        })
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 1215,
                        height: 100,
                    },
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
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
                {successOpen ?
                    <Grid item xs={12}>
                        <Collapse in={successOpen}>
                            <Alert
                                severity="success"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setSearchUser('')
                                            setSuccessOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                Friend request success!
                            </Alert>
                        </Collapse>
                    </Grid> : null}

                <Paper elevation={0} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid container>

                        <Grid item xs={2} style={{ paddingTop: 30 }}>
                            <FormControlLabel labelPlacement="start"
                            onClick={() => toggleLight(lifxState.power === "on" ? "off" : "on")}
                            control={<Switch checked={lifxState ? onOrOff(lifxState.power) : false} color="secondary" />} label="Toggle light" />
                        </Grid>
                        <Grid item xs={2} style={{ paddingTop: 20 }}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    // multiple
                                    value={userSelect ? userSelect : user.name ? user.name : false}
                                    label="User"
                                    onChange={(e) => setUserSelect(e.target.value)}
                                >
                                    {user.friends ?
                                        user.friends.map((x) => (
                                            <MenuItem key={x} value={x}>{x}</MenuItem>
                                        )) :
                                        null
                                    }
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={4} style={{ paddingTop: 20, paddingLeft: 10 }}>
                            <TextField fullWidth label='Search user' onKeyDown={(e) => handleSearchUser(e)} onChange={(e) => setSearchUser(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={2} style={{ paddingTop: 20, paddingLeft: 10, justifyContent: 'center' }}>
                            <TextField fullWidth label='Enter scene name' onChange={(e) => setSceneName(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={2} style={{ paddingTop: 30, paddingLeft: 10, justifyContent: 'center' }}>
                            <Button color="secondary" onClick={handleScene} variant="outlined">
                                Add as scene
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 600,
                        height: 600,
                    },
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
                <Paper elevation={0} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid container>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: 350, paddingTop: 20 }}>
                            <PhotoshopPicker color={colors} onChangeComplete={(color) => handleColor(color)} />
                        </Grid>
                        <Grid item xs={11} style={{ paddingLeft: 45 }}>
                            <Typography id="input-slider" gutterBottom>
                                Brightness
                            </Typography>
                            <Slider
                                aria-label="Brightness"
                                value={brightness ? brightness : lifxState.brightness ? lifxState.brightness * 100 : 100}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                color="secondary"
                                step={10}
                                marks
                                min={10}
                                max={100}
                                onChange={(e) => handleBrightness(e)}
                            />

                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={0} style={{ display: 'flex', justifyContent: 'center' }}>

                </Paper>
            </Box>
        </>
    )
}

export default ConnectSelf