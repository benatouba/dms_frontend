import authHeader from '../helpers/authentication'

function search(query) {
    const requestOptions = authHeader('GET')
    let searchString = '?'
    let entries = Object.entries(query)
    for (const [key, value] of entries) {
        searchString = searchString.concat(`${key}=${value}&`)
    }
    searchString = searchString.slice(0, searchString.length - 1) // cut off unnecessary last symbol '&'

    let answer = fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/file/${searchString}`, requestOptions).then(resp =>
        resp.json()
    )
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
function download(file) {
    // cut filename from file path
    const requestOptions = authHeader('GET')
    requestOptions.redirect = 'follow'
    let answer = fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/file/${file.id}`, requestOptions)
        .then(response => response.blob())
        .then(blob => {
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            let name = file.file_standard_name
            a.download = name
            document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click()
            a.remove() //afterwards we remove the element again
        })
    return answer
}
function downloadBlob(blob) {
    let url = window.URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.href = url
    let now = new Date()
    now = now.toISOString()
    a.download =
        'uc2-dms-download_' +
        now.slice(0, 10) +
        '_' +
        now.slice(11, 13) +
        now.slice(14, 16) +
        now.slice(17, 19) +
        '.zip'
    document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
    a.click()
    a.remove() //afterwards we remove the element again
}
async function downloadAll(ids) {
    // cut filename from file path
    const requestOptions = authHeader('POST')

    // let formdata = new FormData()
    requestOptions.body = JSON.stringify({ id: ids })

    // requestOptions.body = formdata
    requestOptions.redirect = 'follow'
    requestOptions.headers.append('Content-Type', 'application/json')
    // requestOptions.headers['Accept-Encoding'] = ['gzip', 'deflate']
    try {
        let resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/file/retrieve_zip/`, requestOptions)
        let blob = await resp.blob()
        downloadBlob(blob)
        return resp
    } catch (error) {
        throw await error
    }
}

async function deleteFile(file) {
    const requestOptions = authHeader('DELETE')

    let resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/file/${file.id}`, requestOptions)
    if (resp.status === 200) {
        return resp.json()
    } else {
        throw await resp.json()
    }
}

async function setInvalid(file) {
    const requestOptions = authHeader('PATCH')
    try {
        let resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/file/${file.id}/set_invalid/`, requestOptions)
        return resp
    } catch (error) {
        return error
    }
}

export default {
    search,
    meta,
    download,
    downloadAll,
    deleteFile,
    setInvalid,
}
