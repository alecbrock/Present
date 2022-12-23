import axios from 'axios'
import env from './env'

const Post = async (endpoint, body = null) => {
  const path = env.enviroment === 'development' ? env.development_path : env.production_path;

  return new Promise((resolve, reject) => {
    axios.post(`${path}${endpoint}`, body, {
      headers: {
        'auth-token': localStorage.token
      }
    }).then((user) => {
      localStorage.removeItem("msg");
      resolve({ user: user.data });
      // return {user: user.data};

    }).catch((error) => {
      if (error.response.data.unlogged) {
        localStorage.setItem("msg", error.response.data.msg);
        localStorage.removeItem("token");
        window.location.href = "/Login";
        return;
      } else {
        localStorage.setItem("msg", error.response.data.msg);
        // return {user: false};
        reject(error.response.data.msg);
      }
    })
  })
}

export default Post