import React, { useState, useEffect } from "react"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useSelector } from "react-redux"
// import { RootState } from "./state/reducers"
import Dashboard from "./features/Dashboard"
import ConnectSelf from "./features/ConnectSelf"
import ConnectOther from "./features/ConnectOther"
import Login from "./features/Login"
import MorseCommunication from "./features/MorseCommunication"
import RegisterSteps from "./features/RegisterSteps"
import axios from "axios"
import Appbar from "./components/Appbar"
import RequireAuthPost from "./RequireAuthPost"








export default function App(props) {


  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#252529',
          },
          secondary: {
            main: '#5D3FD3',
          },
          background: {
            paper: '#292828',
            default: '#232222',
          },
        },
      }), []//,
    // [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Appbar>
          <Routes>
            <Route path='/' element={<Dashboard authPost={RequireAuthPost} />} />
            <Route path='/connect_self' element={<ConnectSelf authPost={RequireAuthPost} />} />
            <Route path='/connect_other' element={<ConnectOther authPost={RequireAuthPost} />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/morse_communication' element={<MorseCommunication authPost={RequireAuthPost} />} />
            <Route path='/register_steps' element={<RegisterSteps/>}/>
          </Routes>
        </Appbar>
      </BrowserRouter>
    </ThemeProvider>
  );
}
