import authHeader from '../helpers/authentication'

function upload({ file, ignore_warnings, ignore_errors }) {
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

    return fetch(process.env.VUE_APP_API_ENDPOINT + `/data/file/`, requestOptions)
}

function uploadMetadataList(obj) {
    const requestOptions = authHeader('POST')

    const formdata = new FormData()
    formdata.append('file', obj.file)

    requestOptions.body = formdata
    requestOptions.redirect = 'follow'

    return fetch(process.env.VUE_APP_API_ENDPOINT + `/data/${obj.type}/`, requestOptions).then(resp => resp.json())
}

export const uploadService = {
    upload,
    uploadMetadataList,
}
