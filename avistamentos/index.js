const express = require('express')
const app = express()
app.use(express.json())

let id = 0

const avistamentos = {}

app.post("/avistamentos", (req, res) => {

    const local = req.body.local
    const descricao = req.body.descricao

    if (local === undefined || descricao === undefined || local === "" || descricao === "") {
        return res.status(400).send({
            erro: "local e descricao são obrigatórios"
        })
    }

    id++

    avistamentos[id] = {
        id: id,
        local: local,
        descricao: descricao
    }

    res.status(201).send(avistamentos[id])
})

app.get("/avistamentos", function(req, res) {
    res.json(avistamentos)
})

const port = 4000
app.listen(port, () => console.log(`Avistamentos. Porta ${port}.`))