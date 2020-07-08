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

async function uploadMetadataList(file, listname) {
    const requestOptions = authHeader('POST')

    const formdata = new FormData()
    formdata.append('file', file)

    requestOptions.body = formdata
    requestOptions.redirect = 'follow'
    requestOptions.headers.append('Content-Type', 'multipart/form-data')
    console.log(file)
    console.log(listname)
    let promise = await fetch(process.env.VUE_APP_API_ENDPOINT + `/${listname}/`, requestOptions)
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
    return answer
}

export const uploadService = {
    upload,
    uploadMetadataList,
}
