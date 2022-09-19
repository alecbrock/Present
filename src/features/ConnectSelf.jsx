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
    const [value, setValue] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [sceneName, setSceneName] = useState('');
    // const [switched, setSwitched] = useState(null);

    const toggleLight = (str) => {
        dispatch(updateLifxPower(str))
        Post('https://past-alec.herokuapp.com/lifx/toggle', { username: userSelect ? userSelect : user.name ? user.name : '' }).then(() => {
        }).catch((error) => {
            setValue(!value);
            setOpen(true)
        })
    }

    const handleColor = (color) => {
        setColor(color);
        Post('http://localhost:3002/lifx/color', { color: color.hex, username: userSelect ? userSelect : user.name ? user.name : '' }).then((result) => {
            dispatch(updateUserRecentColor(result.user));
        }).catch((error) => {
            setValue(!value);
            setOpen(true)
        })
    };

    // if (true) {
    //     console.log('this is the switched', switched)
    // }


    //within checkAuth on BE must make request to lifx to find state
    //and get wether or not light is on and get color and brightness
    //to set ui to match


    const handleBrightness = (e) => {
        if (brightness !== e.target.value) {
            setBrightness(e.target.value)
            Post('http://localhost:3002/lifx/brightness', { brightness: e.target.value, username: userSelect ? userSelect : user.name ? user.name : '' }).then(() => {
            }).catch((error) => {
                setValue(!value);
                setOpen(true)
            })
        }
    }

    const handleSearchUser = (e) => {
        if (e.keyCode === 13) {
            Post('http://localhost:3002/user/search_user', { searchedUsername: searchUser }).then((result) => {
                setSuccessOpen(true);
            }).catch((error) => {
                console.log(error, localStorage.msg)
                setValue(!value)
                setOpen(true)
            })
        }
    }

    const handleScene = () => {
        Post('http://localhost:3002/user/add_scene', {
            [sceneName]: {
                color: colors.hex,
                brightness: brightness
            }
        }).then((result) => {
            dispatch(updateUserScene(result.user))
        }).catch((error) => {
            setValue(!value)
        })
    }




    //one possible issue
    //adding scene
    //if a different username is selected and the user wishes to add this as a scene
    //it can either add this to their document regardless or
    //can send back an error saying to select your username in order to add a scene

    //i would also like to display the users scenes and allow users to delete scenes
    //material ui cards would be good for this
    //upon selecting a scene will take the settings from the user object for that scene and make a call to change state of their light
    //users will have to name scenes in order for me to be able to delete the correct one
    //the amount of scenes displayed on the dashboard is yet to be determined maybe 4 or 5


    //for search user need to make sure that the user searched is real and that it is not already in the users friends list

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