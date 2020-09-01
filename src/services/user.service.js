import authHeader from '../helpers/authentication'
import i18n from '../plugins/i18n'

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
                    localStorage.setItem('user', JSON.stringify(json))
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
    localStorage.removeItem('user')
}

async function register(user) {
    const requestOptions = authHeader('POST')
    console.log(JSON.stringify(user))
    requestOptions.body = JSON.stringify(user)
    requestOptions.redirect = 'follow'
    requestOptions.headers.append('Content-Type', 'application/json')

    return await fetch(process.env.VUE_APP_API_ENDPOINT + '/auth/user/', requestOptions)
}

async function patch(input) {
    let url = `${process.env['VUE_APP_API_ENDPOINT']}/auth/user/`
    const requestOptions = authHeader('PATCH')

    // used for password reset (forgot password)
    Object.keys(input).forEach(key => {
        if (key === 'token') {
            url = url + 'reset_pw/' + input[key] + '/'
            delete input[key]
        } else if (key === 'pk') {
            url = url + input[key] + '/'
        }
    })

    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.body = JSON.stringify(input)
    requestOptions.redirect = 'follow'

    let resp = await fetch(url, requestOptions)
    if (resp.status !== 200) {
        return await resp.json()
    } else if (input.password) {
        return i18n.t('reset_password.reset_ok')
    } else {
        return i18n.t('account.patch_ok')
    }
}
async function requestPassword(input) {
    const requestOptions = authHeader('POST')
    const urlencoded = new URLSearchParams()
    urlencoded.append('userid', input.userid)

    requestOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    requestOptions.body = urlencoded
    requestOptions.redirect = 'follow'

    let resp = await fetch(`${process.env['VUE_APP_API_ENDPOINT']}/auth/user/request_pw_reset/`, requestOptions)
    if (resp.status !== 200) {
        return await resp.json()
    } else {
        return i18n.t('reset_password.requested')
    }
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
async function manage(id, action) {
    const requestOptions = authHeader('POST')
    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.redirect = 'follow'
    requestOptions.body = JSON.stringify(id, action)

    let resp = await fetch(`${process.env['VUE_APP_API_ENDPOINT']}/auth/user/manage_account/${id}/`, requestOptions)
    if (resp.status !== 200) {
        return await resp.json()
    } else {
        return i18n.t('admin.user_managed')
    }
}

async function _delete(id) {
    const requestOptions = authHeader('DELETE')
    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.redirect = 'follow'

    let resp = await fetch(`${process.env['VUE_APP_API_ENDPOINT']}/auth/user/${id}/`, requestOptions)
    if ([200, 202, 204].includes(resp.status)) {
        return i18n.t('admin.user_deleted')
    } else {
        return await resp.json()
    }
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
    requestPassword,
}
