const fetch_url = "https://recruiting.cat.dp.ua" 
const apiReq = function (url, data, callback) {
  fetch(fetch_url + '/api' + url+'.php', {
    method: data ? "POST" : "GET",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: data ? JSON.stringify({data}) : undefined
  })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        console.log("error(data.error)",data)
      } else {
        console.log(data)
        callback(data);
      }
    })
    .catch(err => {
      console.log(err)
      if (err) console.log("error.server_error");
    })
};
export const getDeviceID = () => {
  console.log("start getDeviceID")
  return dispatch => {
    apiReq('/firstOpen', {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      screenPxDiag: Math.sqrt( Math.pow(window.screen.width, 2) + Math.pow(window.screen.height, 2) ),
    }, function (data) {
      if (data.validation) {
        console.log("firstOpen: ",data)
        dispatch(firstOpen(data))
      } else {
        console.log("firstOpenError")
        dispatch(error("error.server_error"));
      }
    });
  }
}
const firstOpen = e => ({
  type: 'DEVICE_ID',
  payload: e
})
export const userSignupFetch = data => {
  console.log("start userSignupFetch")
  console.log(JSON.stringify({ data }))
  return dispatch => {
    return fetch(fetch_url + "/api/signup.php", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ data })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          dispatch(error(data.error))
        } else {
          console.log(data)
          localStorage.setItem("token", data.jwt)
          dispatch(loginUser(data.user))
          dispatch(message(data.message))
        }
      })
      .catch(err => {
        console.log(err)
        if (err) dispatch(error("error.server_error"))
      })
  }
}
export const userLoginFetch = data => {
  return dispatch => {
    return fetch(fetch_url + "/api/login.php", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ data })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          dispatch(error(data.error))
        } else {
          localStorage.setItem("token", data.jwt)
          dispatch(loginUser(data.user))
          dispatch(message(data.message))
        }
      })
      .catch(err => {
        console.log(err)
        if (err) dispatch(error("error.server_error"))
      })
  }
}
const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
})
export const userPostAvatar = data => {
  console.log("start userPostAvatar")
  console.log(JSON.stringify({ data }))
  return dispatch => {
    return fetch(fetch_url + "/api/image_upload.php", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ data })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          dispatch(error(data.error))
        } else {
          console.log(data)
          dispatch(avatar(data.image))
          dispatch(message(data.message))
        }
      })
      .catch(err => {
        console.log(err)
        if (err) dispatch(error("error.server_error"))
      })
  }
}
const avatar = userObj => ({
  type: 'AVATAR',
  payload: userObj
})
export const userPostForgot = data => {
}
export const userEditPassFetch = data => {
  return dispatch => {
    return fetch(fetch_url + "/api/edit_pass.php", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ data })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          dispatch(error(data.error))
        } else {
          dispatch(message(data.message))
        }
      })
      .catch(err => {
        console.log(err)
        if (err) dispatch(error("error.server_error"))
      })
  }
}
export const getProfileFetch = (token = localStorage.token) => {
  return dispatch => {
    if (token) {
      return fetch(fetch_url + "/api/profile.php?auth=" + token + "", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'auth': `${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.error) {
            localStorage.removeItem("token")
          } else {
            console.log("data.user")
            console.log(data.user)
            dispatch(loginUser(data.user))
            dispatch(message(data.message))
          }
        })
        .catch(err => {
          dispatch(error("error.server_error"))
        })
    }
  }
}
export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})
export const switchMenu = () => ({
  type: 'SWITCH_MENU'
})
export const clearMessage = data => {
  return dispatch => {
    dispatch(error(''))
    dispatch(message(''))
  }
}
const error = userObj => ({
  type: 'ERROR',
  payload: userObj
})
const message = userObj => ({
  type: 'MESSAGE',
  payload: userObj
})