import authHeader from '../helpers/authentication'

function login({username, password}) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: "username: " + username + ", password: " + password
  }
  console.log(myHeaders.get("Content-Type"))
  console.log(requestOptions.body)

  fetch(process.env.VUE_APP_API_ENDPOINT + `/auth/login/`, requestOptions)
    .then(resp => console.log(resp))
    // .then(handleResponse)
    // .then(user => {
    //   // login successful if there's a jwt token in the response
    //   if (user.token) {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('user', JSON.stringify(user))
    //   }
    //   console.log(user)
    //   // this.$store.commit('tokenize', result))
    //   return user
    // })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function register(user) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('username', JSON.stringify(user.name))
  urlencoded.append('password', JSON.stringify(user.password))
  urlencoded.append('first_name', JSON.stringify(user.first_name))
  urlencoded.append('last_name', JSON.stringify(user.last_name))
  urlencoded.append('email', JSON.stringify(user.email))
  urlencoded.append('phone_number', JSON.stringify(user.phone))

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  }

  fetch(`${process.env['VUE_APP_API_ENDPOINT ']}/auth/`, requestOptions)
    .then(handleResponse)
    .then(result => console.log(result))
}

function patch(field, value) {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', authHeader())
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append(field, value)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  }

  fetch(`${process.env['VUE_APP_API_ENDPOINT ']}/auth/`, requestOptions)
    .then(handleResponse)
    .then(result => console.log(result))
}

function list() {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', authHeader())
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  return fetch(`${process.env['VUE_APP_API_ENDPOINT ']}/auth/`, requestOptions)
    .then(handleResponse)
    .then(result => console.log(result))
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', authHeader())

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  }

  return fetch(`${process.env['VUE_APP_API_ENDPOINT ']}/auth/${id}`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

export default {
  login,
  logout,
  register,
  patch,
  list,
  delete: _delete,
}