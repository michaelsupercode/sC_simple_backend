const fs = require("fs")
const http = require("http")
const PORT = 9012

const errorPage = fs.readFileSync("./public/pages/error.html")

const server = http.createServer(function requestListener(req, res) {

    let filePath;
    if (req.url === "/") {
        filePath = "./public/pages/index.html"
    } else if (req.url === "/") {
        filePath = "public/media/favicon.ico"
    } else if (req.url.split("/").length === 2) {
        const pageNameWithoutExtension = req.url.includes(".html")
            ? req.url.split(".")[0]
            : req.url
        filePath = "./public/pages" + pageNameWithoutExtension + ".html"
    } else {
        filePath = "./public" + req.url
    }

    console.log(req.url, "==>", filePath)

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500)
            res.write(errorPage)
        } else {
            res.write(data)
        }
        res.end()
    })
})

server.listen(PORT, () => console.log("..serving at", PORT))