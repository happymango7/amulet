import Router from 'next/router';
import axios from 'axios';
const instance = axios.create({baseURL: `/api/v1`});

/**
 * Verify login helper
 * @param  {str} token -> token string to verify
 * @param  {fnc} cb    -> callback
 */
export default (token, cb) => {
  //no token redirect
  if (!token) {
    Router.push({pathname: '/admin/login'});
  }else {
    //verify
    instance.post('verify', {token: token}).then((res) => {
      if (res.data.success) {
        if (cb) { cb(); }
      }else {
        Router.push({
          pathname: '/admin/login'
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }
};
