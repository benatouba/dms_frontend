import store from '../store'
export default function authHeader(method) {
    let token = store.state.account.token

    const myHeaders = new Headers()
    const requestOptions = { method: method }

    if (token) {
        // prepare request authorization
        myHeaders.append('Authorization', ' Token ' + token)
    }
    requestOptions.headers = myHeaders
    return requestOptions
}
