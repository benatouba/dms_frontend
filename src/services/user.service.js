import authHeader from '../helpers/authentication'

function login({ username, password }) {
    const requestOptions = authHeader('POST')

    const user = {
        username: username,
        password: password,
    }
    requestOptions.body = JSON.stringify(user)

    let answer = fetch(process.env.VUE_APP_API_ENDPOINT + '/auth/login/', requestOptions)
        .then(resp => resp.json())
        .then(json => {
            let answer = new Promise(function(resolve, reject) {
                if (json.token) {
                    json.user = username
                    json.status = { loggedIn: true }
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', json.user)
                    localStorage.setItem('token', json.token)
                    resolve(json.user)
                } else {
                    json.status = { loggedIn: false }
                    reject(json)
                }
            })
            return answer
        })
    return answer
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}

function register(user) {
    const requestOptions = authHeader('POST')

    requestOptions.body = JSON.stringify(user)
    requestOptions.redirect = 'follow'
    let answer = fetch(process.env.VUE_APP_API_ENDPOINT + '/auth/', requestOptions)
    return answer
}

async function patch(toChange) {
    const requestOptions = authHeader('PATCH')
    alert(toChange)
    const urlencoded = new URLSearchParams()
    Object.keys(toChange)
        .forEach(function eachKey(key) {
            alert(key); // alerts key
            alert(toChange[key]); // alerts value
            urlencoded.append(key, toChange[key])
        });

    requestOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    requestOptions.body = urlencoded
    requestOptions.redirect = 'follow'

    let resp = await fetch(`${process.env['VUE_APP_API_ENDPOINT']}/auth/`, requestOptions)
    console.log(resp)
    return resp
}

async function list() {
    const requestOptions = authHeader('GET')
    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.redirect = 'follow'
    let searchParam = localStorage.getItem('user')
    let response = await fetch(`${process.env['VUE_APP_API_ENDPOINT']}/auth/?username=${searchParam}`, requestOptions)
    let user = await response.json()
    return user
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

export const userService = {
    login,
    logout,
    register,
    patch,
    list,
    delete: _delete,
}
