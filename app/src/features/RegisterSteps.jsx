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

const RegisterSteps = (props) => {

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

            </Paper>
        </Box>
    )
}

export default RegisterSteps