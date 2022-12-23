import React, { useState } from "react"
import { useSelector } from "react-redux";
import {
    Grid,
    Box,
    Button,
    TextField,
    Paper,
    Typography,
    Select,
    FormControl,
    MenuItem,
    Card,
    CardActions,
    CardContent,
    Avatar,
    Collapse,
    Alert,
    IconButton
} from "@mui/material"
import Post from "../ApiPost"
import { useDispatch } from "react-redux"
import { updateUserFriends } from '../redux/actions/userActions'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add';
import MessageAlert from "../components/MessageAlert"


const ManageFriends = (props) => {
    props.authPost()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const friendsColor = useSelector((state) => state.friendsColor);
    const [type, setType] = useState('friends')
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleRemoveFriend = (friend) => {
        Post('/user/remove_friend', { friend: friend }).then((result) => {
            dispatch(updateUserFriends(result.user))
        }).catch((error) => {
            setOpen(true)
        })
    }

    const handleAddFriend = (friend) => {
        Post('/user/add_friend', { friend: friend }).then((result) => {
            dispatch(updateUserFriends(result.user))
        }).catch((error) => {
            setOpen(true)
        })
    }


    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

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
                        height: 57,
                    },
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >

                <Paper>
                    <Grid container>
                        <Grid item xs={8}>
                            <TextField fullWidth label='Search user' onChange={(e) => handleSearch(e)} />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={type}
                                    label="Type"
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <MenuItem value={'friends'}>Friends</MenuItem>
                                    <MenuItem value={'pending'}>Pending</MenuItem>
                                </Select>
                            </FormControl>
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
                        width: 1215,
                        height: 600,
                    },
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >


                <Paper>
                    <Grid container direction="row">
                        {
                            type === 'friends' ?
                                <>
                                    {user.friends && JSON.stringify(user.friends) !== '[]' ?
                                        user.friends.map((x, i) => (
                                            x !== user.name && x.includes(search) ?
                                                <Grid key={i} item xs={2} style={{ paddingLeft: 20, paddingTop: 20 }}>
                                                    <Box sx={{ maxWidth: 150 }}>
                                                        <Card variant="outlined">
                                                            <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Avatar style={{ backgroundColor: friendsColor[x], color: 'white', width: 115, height: 115, boxShadow: 8 }}>
                                                                    <Typography variant="h4">
                                                                        {`${x[0]}${x[1]}`}
                                                                    </Typography>
                                                                </Avatar>
                                                            </CardContent>
                                                            <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Typography>{x}</Typography>
                                                            </CardContent>

                                                            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Button variant='outlined' style={{ color: 'white' }} onClick={() => handleRemoveFriend(x)} startIcon={<CloseIcon />}>Remove</Button>
                                                            </CardActions>
                                                        </Card>
                                                    </Box>
                                                </Grid>
                                                : null
                                        )) :
                                        null
                                    }
                                </> :
                                <>
                                    {user.pendingFriends && JSON.stringify(user.pendingFriends) !== '[]' ?
                                        user.pendingFriends.map((x, i) => (
                                            x !== user.name && x.includes(search) ?
                                                <Grid item key={i} xs={2} style={{ paddingLeft: 20, paddingTop: 20 }}>
                                                    <Box sx={{ maxWidth: 150 }}>
                                                        <Card variant="outlined">
                                                            <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Avatar style={{ backgroundColor: friendsColor[x], color: 'white', width: 115, height: 115, boxShadow: 8 }}>
                                                                    <Typography variant="h4">
                                                                        {`${x[0]}${x[1]}`}
                                                                    </Typography>
                                                                </Avatar>
                                                            </CardContent>
                                                            <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Typography>{x}</Typography>
                                                            </CardContent>

                                                            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Button variant='outlined' style={{ color: 'white' }} onClick={() => handleAddFriend(x)} startIcon={<AddIcon />}>Add</Button>
                                                            </CardActions>
                                                        </Card>
                                                    </Box>
                                                </Grid>
                                                : null
                                        )) :
                                        null
                                    }
                                </>
                        }
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}

export default ManageFriends