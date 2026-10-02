const axios = require('axios')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())

const relatosPorAvistamentoId = {}

app.post("/avistamentos/:id/relatos", async (req, res) => {
    const { texto } = req.body
    const id = req.params.id

    const relato = {
        id: uuidv4(),
        texto: texto,
        confirmacoes: 0,
        avistamentoId: req.params.id
    }
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'RelatoCriado',
        dados: relato
    })
    const relatosDoAvistamento = relatosPorAvistamentoId[req.params.id] || []
    relatosDoAvistamento.push(relato)
    relatosPorAvistamentoId[req.params.id] = relatosDoAvistamento
    res.status(201).json(relatosDoAvistamento)
})

app.get("/avistamentos/:id/relatos", function(req, res) {
    res.json(relatosPorAvistamentoId[req.params.id] || [])
})

app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    res.status(200).send({msg: 'ok' })
})

const port = 4100
app.listen(port, () => console.log(`Relatos. Porta 4100.`))