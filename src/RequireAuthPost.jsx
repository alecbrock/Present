import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { setUserAction } from './redux/actions/userActions'
import { setFriendsColor } from "./redux/actions/friendsColorActions"
import { setLifxState } from "./redux/actions/lifxStateActions"
import { setCommunityScenes } from "./redux/actions/communityScenesActions"
import env from './env'

const RequireAuthPost = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const path = env.enviroment === 'development' ? env.development_path : env.production_path;

  function useDebouncedEffect(delay, effect, triggerParams) {
    useEffect(() => {
      const timeout = setTimeout(effect, delay)
      return () => clearTimeout(timeout)
    }, triggerParams)
  }

  useDebouncedEffect(300, () => {
    axios.post(`${path}/auth/check_auth`, {}, {
      headers: {
        'auth-token': localStorage.token
      }
    }).then((result) => {
      if (!user) {
        axios.post(`${path}/auth/user_info`, {}, {
          headers: {
            'auth-token': localStorage.token
          }
        })
          .then((obj) => {
            localStorage.removeItem("msg");
            dispatch(setUserAction(obj.data.user));
            dispatch(setFriendsColor(obj.data.colors));
            dispatch(setLifxState(obj.data.state));
            dispatch(setCommunityScenes(obj.data.communityScenes))
            return obj.data;
          })
          .catch((err) => {
            console.log(err);
            localStorage.setItem("msg", err.response.data.msg);
            localStorage.removeItem("token");
            window.location.href = "/login";
            return err.data;
          })
      }
      return result.data;
    }).catch((error) => {
      localStorage.setItem("msg", error.response.data.msg);
      localStorage.removeItem("token");
      window.location.href = "/login";
      return error.data;
    })

  }, [location])
}

export default RequireAuthPost