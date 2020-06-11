import authHeader from '../helpers/authentication'

function login({ username, password }) {
    const requestOptions = authHeader('POST')

    const user = {
        username: username,
        password: password,
    }
    requestOptions.body = JSON.stringify(user)

    let answer = fetch(process.env.VUE_APP_API_ENDPOINT + `/auth/login/`, requestOptions)
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
    // const myHeaders = new Headers()
    // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    /*const urlencoded = new URLSearchParams()
    urlencoded.append('username', JSON.stringify(user.name))
    urlencoded.append('password', JSON.stringify(user.password))
    urlencoded.append('first_name', JSON.stringify(user.first_name))
    urlencoded.append('last_name', JSON.stringify(user.last_name))
    urlencoded.append('email', JSON.stringify(user.email))
    urlencoded.append('phone_number', JSON.stringify(user.phone))*/

    requestOptions.body = JSON.stringify(user)
    requestOptions.redirect = 'follow'
    let answer = fetch(process.env.VUE_APP_API_ENDPOINT + `/auth/`, requestOptions)
    return answer
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

    fetch(`${process.env['VUE_APP_API_ENDPOINT ']}/auth/`, requestOptions).then(handleResponse)
}

function list() {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', authHeader())
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }

    return fetch(`${process.env['VUE_APP_API_ENDPOINT ']}/auth/`, requestOptions).then(handleResponse)
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
