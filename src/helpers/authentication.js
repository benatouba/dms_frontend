export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('username'));

    if (user && user.token) {
        return 'Basic ' + user.token ;
    } else {
        return "";
    }
}