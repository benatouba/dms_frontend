import authHeader from '../helpers/authentication'

function search(query) {
    const requestOptions = authHeader('GET')
    let searchString = '?'
    let entries = Object.entries(query)
    for (const [key, value] of entries) {
        if (value != null) {
            searchString = searchString.concat(`${key}=${value}&`)
        }
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
function download(file, check_result = false) {
    // cut filename from file path
    const requestOptions = authHeader('GET')
    requestOptions.redirect = 'follow'
    let url = `${process.env.VUE_APP_API_ENDPOINT}/data/file/${file.id}`
    if (check_result) {
        url += '/retrieve_check_result/'
    }
    createAndActivateLink(url)
    // let answer = fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/file/${file.id}`, requestOptions)
    //     .then(response => response.blob())
    //     .then(blob => {
    //         let url = window.URL.createObjectURL(blob)
    //         let a = document.createElement('a')
    //         a.href = url
    //         let name = file.file_standard_name
    //         a.download = name
    //         document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
    //         a.click()
    //         a.remove() //afterwards we remove the element again
    //     })
    // return answer
}
// function clickLink(link) {
//     var cancelled = false
//
//     if (document.createEvent) {
//         var event = document.createEvent('MouseEvents')
//         event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
//         console.log(event)
//         console.log(link)
//         cancelled = !link.dispatchEvent(event)
//     } else if (link.fireEvent) {
//         cancelled = !link.fireEvent('onclick')
//     }
//
//     if (!cancelled) {
//         window.location = link.href
//     }
// }
// function downloadBlob(blob) {
//     let url = window.URL.createObjectURL(blob)
//     let a = document.createElement('a')
//     a.href = url
//     let now = new Date()
//     now = now.toISOString()
//     a.download =
//         'uc2-dms-download_' +
//         now.slice(0, 10) +
//         '_' +
//         now.slice(11, 13) +
//         now.slice(14, 16) +
//         now.slice(17, 19) +
//         '.zip'
//     document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
//     a.click()
//     a.remove() //afterwards we remove the element again
// }
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
async function downloadAll(ids, check_result = false) {
    const requestOptions = authHeader('POST')
    requestOptions.body = JSON.stringify({ uc2observations: ids, check_result })
    requestOptions.redirect = 'follow'
    requestOptions.headers.append('Content-Type', 'application/json')

    try {
        let resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/zip/`, requestOptions)
        let respBody = await resp.json()
        let url = `${process.env.VUE_APP_API_ENDPOINT}/data/zip/${respBody.token}/`
        createAndActivateLink(url)
        return resp
    } catch (error) {
        throw await error
    }
}

async function deleteFile(file) {
    const requestOptions = authHeader('DELETE')

    let resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/file/${file.id}/`, requestOptions)
    if (resp.status === 200) {
        return resp.json()
    } else {
        throw await resp.json()
    }
}

async function setInvalid(file) {
    const requestOptions = authHeader('PATCH')
    let resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/data/file/${file.id}/set_invalid/`, requestOptions)
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
}
