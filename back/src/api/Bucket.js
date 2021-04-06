const fs = require('fs')
const path = require('path')

function save(file, pathname) {
    return createDirectories(pathname).then(
        () =>
            new Promise((resolve, reject) => {
                fs.writeFile(pathname, file, function (err) {
                    if (err) reject(err)
                    resolve({ success: true })
                })
            })
    )
}
function saveBase64(base64, pathname) {
    return createDirectories(pathname).then(() => {
        const base64Data = base64.replace(/^data:([A-Za-z-+\/]+);base64,/, '')
        return new Promise((resolve, reject) => {
            fs.writeFile(
                pathname,
                base64Data,
                { encoding: 'base64' },
                function (err) {
                    if (err) reject(err)
                    resolve({ success: true })
                }
            )
        })
    })
}
function read(pathname) {}
function remove(pathname) {}
function createDirectories(pathname) {
    return new Promise((resolve, reject) => {
        const __dirname = path.resolve()
        // pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '') // Remove leading directory markers, and remove ending /file-name.extension
        pathname = pathname.replace(/^\.*\/|\/?[^\/]+$/g, '') // Remove leading directory markers, and remove ending /file-name.extension
        fs.mkdir(
            path.resolve(__dirname, pathname),
            { recursive: true },
            (e) => {
                if (e) {
                    console.error(e)
                    reject(e)
                } else {
                    console.log('Success')
                    resolve()
                }
            }
        )
    })
}

const Bucket = {
    save,
    saveBase64,
    read,
    remove,
    createDirectories,
}

module.exports = Bucket
