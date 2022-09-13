import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { setUserAction } from './redux/actions/userActions'

const RequireAuthPost = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  function useDebouncedEffect(delay, effect, triggerParams) {
    useEffect(() => {
      const timeout = setTimeout(effect, delay)
      return () => clearTimeout(timeout)
    }, triggerParams)
  }

  useDebouncedEffect(300, () => {
    console.log('location changed')
    axios.post('http://localhost:3002/auth/checkAuth',{},{
      headers: {
        'auth-token': localStorage.token
      }})
      .then((user) => {
        localStorage.removeItem("msg");
        console.log(user.data);
        dispatch(setUserAction(user.data))
        return user.data;
      })
      .catch((err) => {
        localStorage.setItem("msg", err.response.data.msg);
        localStorage.removeItem("token");
        window.location.href = "/Login";
        return err.data;
      })
  }, [location])
}

export default RequireAuthPost