export default function authHeader(method) {
    // return authorization header with jwt token
    let user = localStorage.getItem('user')
    let token = localStorage.getItem('token')

    const myHeaders = new Headers()
    const requestOptions = { method: method }

    if (user && token) {
        // prepare request authorization
        myHeaders.append('Authorization', ' Token ' + localStorage.getItem('token'))
    }
    requestOptions.headers = myHeaders
    return requestOptions
}
