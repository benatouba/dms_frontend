import authHeader from '../helpers/authentication'

async function createPalmjob(job) {
    const requestOptions = authHeader('POST')
    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.body = JSON.stringify(job)
    requestOptions.redirect = 'follow'
    let resp = await fetch(process.env.VUE_APP_API_ENDPOINT + '/data/palmjob/', requestOptions)
    if (resp.status === 201) {
        return await resp.json()
    } else {
        throw await resp.json()
    }
}

async function requestNameCheck(files) {
    const requestOptions = authHeader('POST')
    requestOptions.headers.append('Content-Type', 'application/json')
    requestOptions.body = JSON.stringify(files)

    const resp = await fetch(process.env.VUE_APP_API_ENDPOINT + '/data/palmfile/palmfilenames/', requestOptions)
    // if (resp.status === 200) {
    return resp
    // } else {
    //     throw await resp.json()
    // }
}

function upload({ file, ignore_warnings, ignore_errors }) {
    const requestOptions = authHeader('POST')

    const formdata = new FormData()
    if (file.job) {
        formdata.append('job', file.job)
    }
    // formdata.append('file_type', file.type.toUpperCase())
    formdata.append('file', file)
    if (ignore_warnings) {
        formdata.append('ignore_warnings', 'true')
    }
    if (ignore_errors) {
        formdata.append('ignore_errors', 'true')
    }
    let path = '/data/'
    if (file.db_filetype === 'uc2') {
        path += 'file/'
    } else if (file.db_filetype === 'palmfile') {
        path += file.db_filetype + '/'
    } else {
        throw new Error('File not found')
    }

    requestOptions.body = formdata
    requestOptions.redirect = 'follow'
    return fetch(process.env.VUE_APP_API_ENDPOINT + path, requestOptions)
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
    createPalmjob,
    requestNameCheck,
    upload,
    uploadMetadataList,
}
