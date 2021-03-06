import authHeader from '../helpers/authentication'

function search(query, filetype) {
    const requestOptions = authHeader('GET')
    let searchString = '?'
    let entries = Object.entries(query)
    for (const [key, value] of entries) {
        if (value != null) {
            searchString = searchString.concat(`${key}=${value}&`)
        }
    }
    searchString = searchString.slice(0, searchString.length - 1) // cut off unnecessary last symbol '&'

    let answer = fetch(
        `${process.env.VUE_APP_API_ENDPOINT}/data/${filetype}/${searchString}`,
        requestOptions
    ).then(resp => resp.json())
    return answer
}
async function meta(name) {
    try {
        let resp = await fetch(`${process.env['VUE_APP_API_ENDPOINT']}/data/${name}`)
        return await resp.json()
    } catch (error) {
        return error
    }
}
async function sendPostRequest(url, body, content_type = 'application/json') {
    var requestOptions = {}
    requestOptions = authHeader('POST')
    requestOptions.body = JSON.stringify(body)
    requestOptions.redirect = 'follow'
    requestOptions.headers.append('Content-Type', content_type)
    return await fetch(url, requestOptions)
}

async function download(file, db_filetype, check_result = false) {
    // cut filename from file path
    var requestOptions = {}
    var request_url

    if (file.file_size >= 2e7 && !check_result) {
        try {
            let request_body = {}
            if (db_filetype === 'uc2') {
                request_body = { uc2observations: file.id, check_result }
                db_filetype = 'file'
            } else {
                request_body = { palm: file.id }
            }
            request_url = `${process.env.VUE_APP_API_ENDPOINT}/data/${db_filetype}/${file.resp.id}/request_retrieve/`
            let resp = await sendPostRequest(request_url, request_body)
            // let resp = await fetch(request_url, requestOptions)
            let respBody = await resp.json()
            let download_url = `${process.env.VUE_APP_API_ENDPOINT}/data/${db_filetype}/${respBody.token}/`
            createAndActivateLink(download_url)
            return resp
        } catch (error) {
            throw await error
        }
    }
    requestOptions = authHeader('GET')
    request_url = `${process.env.VUE_APP_API_ENDPOINT}/data/${db_filetype}/${file.id}`

    requestOptions.redirect = 'follow'

    if (check_result) {
        request_url += '/retrieve_check_result'
    }

    // createAndActivateLink(url)
    let answer = fetch(request_url, requestOptions)
        .then(resp => resp.blob())
        .then(blob => {
            let object_url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = object_url
            let name = file.file_standard_name
            if (check_result) {
                name = name.split('.')[0] + '_check_result.txt'
            }
            a.download = name
            document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click()
            a.remove() //afterwards we remove the element again
        })
        .catch(err => {
            console.log(err)
        })

    return answer
}

function createAndActivateLink(url) {
    const a = document.createElement('a')
    a.setAttribute('type', 'hidden')
    a.id = 'downloadZip'
    a.setAttribute('download', true)
    a.href = url

    const clickHandler = () => {
        setTimeout(() => {
            URL.revokeObjectURL(url)
            a.removeEventListener('click', clickHandler)
        }, 100)
    }
    a.addEventListener('click', clickHandler, false)
    a.click()
}
async function downloadAll(ids, db_filetype, check_result = false) {
    // const requestOptions = authHeader('POST')
    // requestOptions.body = JSON.stringify({ uc2observations: ids, check_result })
    // requestOptions.redirect = 'follow'
    // requestOptions.headers.append('Content-Type', 'application/json')

    try {
        let request_url = `${process.env.VUE_APP_API_ENDPOINT}/data/zip/`

        let request_body = {}
        if (db_filetype === 'uc2') {
            request_body = { uc2observations: ids, check_result }
        } else if (db_filetype === 'palmfile') {
            request_body = { palm: ids }
        }
        let resp = await sendPostRequest(request_url, request_body)
        // let resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/zip/`, requestOptions)
        let respBody = await resp.json()
        let download_url = `${process.env.VUE_APP_API_ENDPOINT}/data/zip/${respBody.token}/`
        createAndActivateLink(download_url)
        return resp
    } catch (error) {
        throw await error
    }
}

async function deleteFile(file) {
    const requestOptions = authHeader('DELETE')
    var db_filetype = file.db_filetype
    if (db_filetype === 'uc2') {
        db_filetype = 'file'
    }
    const id = file.resp.result.id

    let resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/${db_filetype}/${id}/`, requestOptions)
    if ([200, 204].includes(resp.status)) {
        return resp
    } else {
        throw await resp.json()
    }
}

async function setInvalid(file) {
    const requestOptions = authHeader('PATCH')
    var db_filetype = file.db_filetype
    if (db_filetype === 'uc2') {
        db_filetype = 'file'
    }
    const id = file.resp.result.id

    let resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/${db_filetype}/${id}/set_invalid/`, requestOptions)
    if ([200, 204].includes(resp.status)) {
        return resp
    } else {
        throw await resp.json()
    }
}
async function getJoblist() {
    const requestOptions = authHeader('GET')
    let resp = await fetch(process.env.VUE_APP_API_ENDPOINT + '/data/palmjob/', requestOptions)
    if (resp.status === 200) {
        return resp.json()
    } else {
        throw await resp.json()
    }
}
export default {
    search,
    meta,
    download,
    downloadAll,
    deleteFile,
    setInvalid,
    getJoblist,
}
