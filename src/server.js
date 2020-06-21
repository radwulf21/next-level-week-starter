//utilizando o express
const express = require("express")
const server = express()

//configurando pasta publica
server.use(express.static("public"))


//utilizando template engine para tornar o html dinâmico
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar os caminhos da aplicação
    //página inicial
    //req: requisição
    //res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
    return res.render("search-results.html")
})


//ligar o server
server.listen(3000)
