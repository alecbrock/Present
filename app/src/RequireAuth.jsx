import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { setLoginMessage } from "./redux/actions/loginMessageActions"

const RequireAuth = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  function useDebouncedEffect(delay, effect, triggerParams) {
    useEffect(() => {
      const timeout = setTimeout(effect, delay)
      return () => clearTimeout(timeout)
    }, triggerParams)
  }

  // useEffect(() => {
  //   console.log("Location changed");
  //   //make axios get request to localhost 3002/auth/checkAuth
  //   axios.get('http://localhost:3002/auth/checkAuth')
  //     .then((user) => {
  //       // dispatch(setLoginMessage(false));
  //       return user.data;
  //     })
  //     .catch((err) => {
  //       //delete user information
  //       //set error message in redux
  //       // console.log(err);
  //       dispatch(setLoginMessage(err.response.data.msg))
  //       window.location.href = "/Login";
  //       return err.data;
  //     })
  // }, [location]);

  useDebouncedEffect(300, () => {
    console.log('location changed')
    axios.post('http://localhost:3002/auth/checkAuth',{},{
      headers: {
        'auth-token': localStorage.token
      }})
      .then((user) => {
        localStorage.removeItem("msg");
        return user.data;
      })
      .catch((err) => {
        // dispatch(setLoginMessage(err.response.data.msg))
        localStorage.setItem("msg", err.response.data.msg);
        localStorage.removeItem("token");
        window.location.href = "/Login";
        return err.data;
      })
  }, [location])
}

export default RequireAuth