const express = require("express");
const app = express()
const path = require("path")
const PORT = 3000
const bodyParser = require('body-parser')
const {request, response} = require("express");
const jsonParser = bodyParser.json()



app.use(express.static(path.resolve(__dirname,"../", "front")));

app.get("/", (request, response) => {
    response.sendFile(path.resolve(__dirname, "../", "front","html", "index.html"))
});

app.get("/lab2", (request, response) => {
    response.sendFile(path.resolve(__dirname, "../", "front", "html", "index_lab2.html"))
});

app.listen(PORT, (request, response) => {
    console.log(`Проект запущено! Дивіться на http://localhost:${PORT}`)
})

