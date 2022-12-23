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
import Effect from '../components/Effect';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import MessageAlert from "../components/MessageAlert"


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

const effectsList = ['', 'Breathe', 'Pulse', 'Candle', 'Cycle'];


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
    const [successMessage, setSuccessMessage] = useState(false);
    const [sceneName, setSceneName] = useState('');
    const [effect, setEffect] = useState(false);
    const [colorArray, setColorArray] = useState([]);
    const [colorIndex, setColorIndex] = useState(0);
    const [period, setPeriod] = useState(0);
    const [cycles, setCycles] = useState(0);
    // const [effectError, setEffectError] = useState({});
    const [intensity, setIntensity] = useState(0);

    const toggleLight = (str) => {
        dispatch(updateLifxPower(str))
        Post('/lifx/toggle', { username: userSelect ? userSelect : user.name ? user.name : '' }).then(() => {
        }).catch((error) => {
            setOpen(true)
        })
    }

    const handleColor = (color) => {
        setColor(color);
        console.log(color.hex);
        if (effect) {
            const colorLimit = effect === 'Cycle' ? 8 : 2;
            let arr = colorArray;

            arr[colorIndex] = color.hex;
            setColorArray(arr);
            setColorIndex(colorLimit === 2 ? 1 : colorArray.length === colorLimit ? 7 : arr.length);
        }

        Post('/lifx/color', { color: color.hex, brightness: brightness, username: userSelect ? userSelect : user.name ? user.name : '' }).then((result) => {
            dispatch(updateUserRecentColor(result.user));
        }).catch((error) => {
            setOpen(true)
        })
    };

    const handleColorIndex = (index) => {
        setColorIndex(index);
    }

    //upon choosing color will come into handleColor and set either the first array element or second to color
    //will then pass those colors down to the effect and the effect will display

    //in effect will be hook from to which will initialy be set to 0
    //0 will be passed to handleColor which will then change the value in array at 0 to incoming color
    //the hook will then increment by 1
    //so next time color is selected it will change value in array at index of 1

    //inside the handle function will determine based off name wether or not to stop at 1 or another number because pulse and breathe only take two colors
    //pressing on the card will set the hook to that cards color
    //so when pressing a new color it will change that value at index

    //incrementing number hook will be set in effect
    //along with the states needed for effect
    //connect self will hold the array of colors so handleColor will be sent down to effect so that when color changes it will invoke the handlecolor function sending it the incremented number and with that will set value at index and then send request to change color

    const handleBrightness = (e) => {
        if (brightness !== e.target.value) {
            setBrightness(e.target.value)
            Post('/lifx/brightness', { brightness: e.target.value, username: userSelect ? userSelect : user.name ? user.name : '' }).then(() => {
            }).catch((error) => {
                setOpen(true)
            })
        }
    }

    const handleSearchUser = (e) => {
        if (e.keyCode === 13) {
            Post('/user/search_user', { searchedUsername: searchUser }).then((result) => {
                setSuccessMessage('Succesfully sent friend request!');
            }).catch((error) => {
                setOpen(true)
            })
        }
    }

    const handleScene = () => {
        Post('/user/add_scene', {
            [sceneName]: {
                color: colors.hex,
                brightness: brightness ? brightness : 100,
                effect: effect ? {
                    name: effect,
                    period: period ? Number(period) : false,
                    cycles: cycles ? Number(cycles) : false,
                    color: colorArray[0] ? colorArray[0] : false,
                    fromColor: colorArray[1] ? colorArray[1] : false,
                    intensity: intensity ? intensity : false,
                    colorArray: colorArray ? colorArray : false
                } : false
            }
        }).then((result) => {
            setSuccessMessage('Succesfully added scene!')
            dispatch(updateUserScene(result.user))
        }).catch((error) => {
            setOpen(true)
        })
    }

    //since scene needs effect data
    //need to move effect state to this level

    //need to make a reusable component for errors and or success messages
    //need to make a reusable component for scenes

    const handleEffect = (name, effect) => {
        Post(`/lifx/${name}_effect`, {
            period: effect.period,
            cycles: effect.cycles,
            color: colorArray[0],
            fromColor: colorArray[1],
            intensity: effect.intensity,
            colorArray: colorArray,
            username: userSelect ? userSelect : user.name ? user.name : ''
        }).then((result) => {

        }).catch((error) => {
            setOpen(true)
        })
    }

    const cancelEffect = (name) => {
        Post(`/lifx/cancel_effect`, {
            username: userSelect ? userSelect : user.name ? user.name : '',
            effectName: name
        }).then((result) => {

        }).catch((error) => {
            setOpen(true)
        })
    }

    //if effect is selected dont allow handlecolor to send request

    return (
        <>
            <MessageAlert open={open} setOpen={setOpen} successMessage={successMessage} setSuccessMessage={setSuccessMessage} />
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 550,
                                height: 550,
                            },
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                    >
                        <Paper>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-name-label">Effect</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            value={effect}
                                            label="Effect"
                                            onChange={(e) => setEffect(e.target.value)}
                                        >
                                            {
                                                effectsList.map((x) => (
                                                    <MenuItem key={x} value={x}>{x ? x : 'None'}</MenuItem>
                                                ))
                                            }

                                        </Select>
                                    </FormControl>
                                    <Grid container>

                                        <Grid item xs={2}>

                                        </Grid>
                                        <Grid item xs={8}>

                                            {
                                                effect ?
                                                    <Effect
                                                        name={effect}
                                                        colorIndex={colorIndex}
                                                        colorArray={colorArray}
                                                        period={period}
                                                        cycles={cycles}
                                                        intensity={intensity}
                                                        // effectError={effectError}
                                                        handleEffect={handleEffect}
                                                        handleColorIndex={handleColorIndex}
                                                        cancelEffect={cancelEffect}
                                                        setPeriod={setPeriod}
                                                        setCycles={setCycles}
                                                        setIntensity={setIntensity}
                                                        // setEffectError={setEffectError}
                                                        userSelect={props.userSelect ? props.userSelect : user.name ? user.name : false} /> :
                                                    null

                                            }
                                        </Grid>
                                        <Grid item xs={2}>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default ConnectSelf

//on switch of a user need to gather that users state and pull down to redux

