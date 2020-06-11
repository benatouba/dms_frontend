import authHeader from '../helpers/authentication'

async function upload(file) {
    const requestOptions = authHeader('POST')

    const formdata = new FormData()
    formdata.append('file_type', 'UC2')
    formdata.append('file', file)

    requestOptions.body = formdata
    requestOptions.redirect = 'follow'

    let promise = fetch(process.env.VUE_APP_API_ENDPOINT + `/uc2upload/`, requestOptions)
        .then(resp => resp.json())
        .then(resp => {
            let answer = new Promise(function(resolve, reject) {
                if (resp.status !== 1) {
                    reject(resp)
                } else {
                    resolve(resp)
                }
            })
            return answer
        })
    let answer = await promise
    await new Promise(resolve => setTimeout(resolve, 3000))
    return answer
}

/*function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                location.reload()
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}*/

export const uploadService = {
    upload,
}
