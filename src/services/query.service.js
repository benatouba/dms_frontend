import authHeader from '../helpers/authentication'

function query(input) {
    const requestOptions = authHeader('GET')
    let answer = fetch(
        process.env.VUE_APP_API_ENDPOINT + `/uc2list/?file_standard_name=${input}`,
        requestOptions
    ).then(resp => resp.json())
    return answer
}

function download(file) {
    const requestOptions = authHeader('GET')
    requestOptions.headers['Content-Type'] = 'multipart/form-data'
    let answer = fetch(process.env.VUE_APP_API_ENDPOINT + file, requestOptions)
        .then(response => response.blob())
        .then(blob => {
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            let name = file.split('/')
            a.download = name[name.length - 1]
            document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click()
            a.remove() //afterwards we remove the element again
        })
    return answer
}
export const queryService = {
    query,
    download,
}
