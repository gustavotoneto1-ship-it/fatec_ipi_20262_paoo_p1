const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

let id = 0

const avistamentos = {}

app.post("/avistamentos", async (req, res) => {
    const local = req.body.local
    const descricao = req.body.descricao
     if (local === undefined || descricao === undefined || local === "" || descricao === "") {
        return res.status(400).send({
            erro: "local e descricao são obrigatórios"
        })
    }
    id++
    const avistamento = {
        id: id,
        local: local,
        descricao: descricao
    }
    avistamentos[id] = avistamento
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'AvistamentoCriado',
        dados: avistamento
    })
    res.status(201).send(avistamentos[id])
})

app.get("/avistamentos", function(req, res) {
    res.json(avistamentos)
})

app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    res.status(200).send({msg: 'ok' })
})

const port = 4000
app.listen(port, () => console.log(`Avistamentos. Porta ${port}.`))