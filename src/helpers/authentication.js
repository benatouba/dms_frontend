// import Vue from 'vue'
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
// Vue.http.headers.common['Access-Control-Request-Method'] = '*'

export default function authHeader(method) {
    // return authorization header with jwt token
    let user = localStorage.getItem('user')
    let token = localStorage.getItem('token')

    const myHeaders = new Headers()
    const requestOptions = { method: method }

    if (user && token) {
        // prepare request authorization
        myHeaders.append('Authorization', ' Token ' + localStorage.getItem('token'))
    } else {
        // prepare login request
        myHeaders.append('Content-Type', 'application/json')
    }
    requestOptions.headers = myHeaders
    // requestOptions.redirect = 'follow'
    return requestOptions
}
