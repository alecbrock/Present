import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { setUserAction } from './redux/actions/userActions'
import { setFriendsColor } from "./redux/actions/friendsColorActions"
import { setLifxState } from "./redux/actions/lifxStateActions"


const RequireAuthPost = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function useDebouncedEffect(delay, effect, triggerParams) {
    useEffect(() => {
      const timeout = setTimeout(effect, delay)
      return () => clearTimeout(timeout)
    }, triggerParams)
  }

  useDebouncedEffect(300, () => {
    axios.post('http://localhost:3002/auth/check_auth', {}, {
      headers: {
        'auth-token': localStorage.token
      }
    }).then((result) => {
      if (!user) {
        axios.post('http://localhost:3002/auth/user_info', {}, {
          headers: {
            'auth-token': localStorage.token
          }
        })
          .then((obj) => {
            localStorage.removeItem("msg");
            dispatch(setUserAction(obj.data.user));
            dispatch(setFriendsColor(obj.data.colors));
            dispatch(setLifxState(obj.data.state));
            return obj.data;
          })
          .catch((err) => {
            console.log(err);
            localStorage.setItem("msg", err.response.data.msg);
            localStorage.removeItem("token");
            window.location.href = "/Login";
            return err.data;
          })
      }
      return result.data;
    }).catch((error) => {
      localStorage.setItem("msg", error.response.data.msg);
      localStorage.removeItem("token");
      window.location.href = "/Login";
      return error.data;
    })

  }, [location])
}

export default RequireAuthPost