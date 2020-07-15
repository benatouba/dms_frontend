import authHeader from '../helpers/authentication'

async function upload({file, ignore_warnings, ignore_errors}) {
    const requestOptions = authHeader('POST')

    const formdata = new FormData()
    formdata.append('file_type', 'UC2')
    formdata.append('file', file)
    if (ignore_warnings) {
        formdata.append('ignore_warnings', 'true')
    }
    if (ignore_errors) {
        formdata.append('ignore_errors', 'true')
    }

    requestOptions.body = formdata
    requestOptions.redirect = 'follow'

    let promise = fetch(process.env.VUE_APP_API_ENDPOINT + `/data/file/`, requestOptions)
        .then(resp => resp.json())
        // .then(resp => {
        //     let answer = new Promise(function(resolve, reject) {
        //         if (resp.status !== 1) {
        //             reject(resp)
        //         } else {
        //             resolve(resp)
        //         }
        //     })
        //     return answer
        // })
    let answer = await promise
    // await new Promise(resolve => setTimeout(resolve, 3000))
    return answer
}

function uploadMetadataList(obj) {
    const requestOptions = authHeader('POST')

    const formdata = new FormData()
    formdata.append('file', obj.file)

    requestOptions.body = formdata
    requestOptions.redirect = 'follow'
    requestOptions.headers.append('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')

    return fetch(process.env.VUE_APP_API_ENDPOINT + `/data/${obj.type}/`, requestOptions)
        .then(resp => resp.json())
}

export const uploadService = {
    upload,
    uploadMetadataList,
}
