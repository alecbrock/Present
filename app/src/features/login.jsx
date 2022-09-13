import React, { useState, useEffect } from "react"
import {
    Grid,
    Box,
    Button,
    Divider,
    Modal,
    TextField,
    Paper,
    Typography,
    Alert
} from "@mui/material"
import axios from "axios"


const Login = (props) => {

    const [loginOrReg, setloginOrReg] = useState(true);
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = useState(false);

    // let loginMessage = useSelector((state) => state.loginMessage);
    const keyDown = (e) => {
        if(e.keyCode === 13) {
            login()
        }
    }

    const login = () => {
        if (loginOrReg) {
            axios.post('http://localhost:3002/auth/login', {
                email,
                password
            }).then((user) => {
                console.log(user.data);
                localStorage.setItem("token", user.data);
                localStorage.removeItem("msg");
                window.location.href = "/";
            }).catch((err) => {
                console.log(err.response.data.msg);
                localStorage.removeItem("token")
                localStorage.setItem("msg", err.response.data.msg);
                setValue(!value);
            })
        } else {
            axios.post('http://localhost:3002/auth/register', {
                name,
                email,
                password
            }).then((user) => {
                console.log(user.data);
                localStorage.removeItem("msg");
                window.location.href = "/login";
            }).catch((err) => {
                console.log(err);
                localStorage.setItem("msg", err.response.data.msg);
                localStorage.removeItem("token")
                setValue(!value);
            })
        }
    };


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
                    <Grid item xs={11} style={{ paddingTop: 10 }}>
                        {localStorage.msg ?
                            <Alert severity="error">{localStorage.msg}</Alert> :
                            null
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="secondary" variant="h4" style={{ paddingTop: 10, paddingLeft: 25 }}>
                            {loginOrReg ? "LOGIN" : "REGISTER"}
                        </Typography>
                    </Grid>
                    {loginOrReg ?
                        null :
                        <Grid item xs={11}>
                            <TextField
                                label="Username"
                                id="outlined-size-normal"
                                defaultValue="Enter your username"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>}
                    <Grid item xs={11}>
                        <TextField
                            label="Email"
                            id="outlined-size-normal"
                            defaultValue="Enter your email"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label="Password"
                            id="outlined-size-normal"
                            defaultValue="Enter your password"
                            variant="outlined"
                            fullWidth
                            onKeyDown={(e) => keyDown(e)}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Button fullWidth color="secondary" variant="outlined" onClick={() => login()}>
                            {loginOrReg ? "Login" : "Register"}
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="text" onClick={() => setloginOrReg(!loginOrReg)} style={{ paddingTop: 10, color: 'white', backgroundColor: 'transparent' }}>
                            {loginOrReg ? "Don't already have an account?" : "Already have an account?"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Login