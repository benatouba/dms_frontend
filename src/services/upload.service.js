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

function upload(payload) {
    const requestOptions = authHeader('POST')
    const formdata = new FormData()
    formdata.append('file', payload.file)

    const { db_filetype, ignore_errors, ignore_warnings } = payload
    formdata.append('ignore_warnings', ignore_warnings)
    formdata.append('ignore_errors', ignore_errors)
    let path = '/data/'
    if (db_filetype === 'uc2') {
        formdata.append('file_type', db_filetype.toUpperCase())
        path += 'file/'
    } else if (db_filetype === 'palmfile') {
        formdata.append('job', payload.job_name)
        path += db_filetype + '/'
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
