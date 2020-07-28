import authHeader from '../helpers/authentication'

function login({ username, password }) {
    const requestOptions = authHeader('POST')

    const user = {
        username: username,
        password: password,
    }
    requestOptions.body = JSON.stringify(user)
    requestOptions.headers.append('Content-Type', 'application/json')

    let answer = fetch(process.env.VUE_APP_API_ENDPOINT + '/auth/login/', requestOptions)
        .then(resp => resp.json())
        .then(json => {
            let answer = new Promise(function(resolve, reject) {
                if (json.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('user', json)
                    localStorage.setItem('user', json.username)
                    localStorage.setItem('token', json.token)
                    localStorage.setItem('is_superuser', json.is_superuser)
                    localStorage.setItem('loggedIn', 'true')
                    localStorage.setItem('email', json.email)
                    localStorage.setItem('first_name', json.first_name)
                    localStorage.setItem('id', json.id)
                    localStorage.setItem('last_name', json.last_name)
                    localStorage.setItem('phone_number', json.phone_number)
                    json.groups.forEach((group, id) => localStorage.setItem(`group${id}`, group.name))
                    console.log(json)
                    resolve(json)
                } else {
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
    localStorage.removeItem('is_superuser')
    localStorage.setItem('loggedIn', '') // set to empty string, since f.e. firefox can only store 'strings'. JS will coerce this to bool false.
}

function register(user) {
    const requestOptions = authHeader('POST')

    requestOptions.body = JSON.stringify(user)
    requestOptions.redirect = 'follow'
    let answer = fetch(process.env.VUE_APP_API_ENDPOINT + '/auth/user/', requestOptions)
    return answer
}

async function patch(toChange) {
    const requestOptions = authHeader('PATCH')
    alert(toChange)
    const urlencoded = new URLSearchParams()
    Object.keys(toChange).forEach(function eachKey(key) {
        alert(key) // alerts key
        alert(toChange[key]) // alerts value
        urlencoded.append(key, toChange[key])
    })

    requestOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    requestOptions.body = urlencoded
    requestOptions.redirect = 'follow'

    let resp = await fetch(`${process.env['VUE_APP_API_ENDPOINT']}/auth/user/`, requestOptions)
    return resp
}

async function list(searchParam) {
    const requestOptions = authHeader('GET')
    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.redirect = 'follow'

    let response = await fetch(
        `${process.env['VUE_APP_API_ENDPOINT']}/auth/user/?username=${searchParam}`,
        requestOptions
    )
    let user = await response.json()
    return user
}

async function info(id) {
    const requestOptions = authHeader('GET')
    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.redirect = 'follow'

    let response = await fetch(`${process.env['VUE_APP_API_ENDPOINT']}/auth/user/${id}`, requestOptions)
    let user = await response.json()
    return user
}

// prefixed function name with underscore because delete is a reserved word in javascript
function manage(id, action) {
    const requestOptions = authHeader('POST')
    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.redirect = 'follow'
    requestOptions.body = JSON.stringify(id, action)

    return fetch(`${process.env['VUE_APP_API_ENDPOINT']}/auth/user/${id}/`, requestOptions).then(handleResponse)
}

function _delete(id) {
    const requestOptions = authHeader('DELETE')
    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.redirect = 'follow'

    return fetch(`${process.env['VUE_APP_API_ENDPOINT']}/auth/user/${id}/`, requestOptions).then(handleResponse)
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
    delete: _delete,
    list,
    info,
    manage,
}
