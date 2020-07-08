import authHeader from '../helpers/authentication'

function query(input) {
    const requestOptions = authHeader('GET')
    let searchString = '?'
    let entries = Object.entries(input)
    for (const [key, value] of entries) {
        searchString = searchString.concat(`${key}=${value}&`)
        }
    searchString = searchString.slice(0, searchString.length - 1) // cut off unnecessary last symbol '&'

    let answer = fetch(
        `${process.env.VUE_APP_API_ENDPOINT}/uc2list/${searchString}`,
        requestOptions
    ).then(resp => resp.json())
    return answer
}

function download(file) {
    // cut filename from file path
    const requestOptions = authHeader('GET')
    // requestOptions.headers['Content-Type'] = 'multipart/form-data'
    let answer = fetch(`${process.env.VUE_APP_API_ENDPOINT}/uc2list/${file.id}`, requestOptions)
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

function deleteFile(file) {
    const requestOptions = authHeader('DELETE')

    let response = fetch(`${process.env.VUE_APP_API_ENDPOINT}/uc2list/${file.id}`, requestOptions).then(resp => {
        let response = new Promise(function(resolve, reject) {
            if (resp.status === 403) {
                reject('Unauthorized')
            } else {
                resolve(resp.json())
            }
        })
        return response
    })
    return response
}

export default {
    query,
    download,
    deleteFile,
}
