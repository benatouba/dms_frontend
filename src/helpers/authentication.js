import store from '../store'
export default function authHeader(method) {
    // let user = localStorage.getItem('user')
    // let token = localStorage.getItem('token')

    let user = store.state.account.user
    let token = store.state.account.token

    const myHeaders = new Headers()
    const requestOptions = { method: method }

    if (user && token) {
        // prepare request authorization
        myHeaders.append('Authorization', ' Token ' + token)
    }
    requestOptions.headers = myHeaders
    return requestOptions
}
