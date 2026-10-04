const express = require('express')
const app = express()
app.use(express.json())

const baseConsulta = {}

const funcoes = {
    AvistamentoCriado: (avistamento) => {
        baseConsulta[avistamento.id] = avistamento
        baseConsulta[avistamento.id]['relatos'] = []
    },
    RelatoCriado: (relato) => {
        const relatos = baseConsulta[relato.avistamentoId]['relatos'] || []
        relatos.push(relato)
        baseConsulta[relato.avistamentoId]['relatos'] = relatos
    }
}

app.get('/avistamentos', (req, res) => {
    res.json(baseConsulta)
})

app.post('/eventos', function(req, res) {
    const evento = req.body 
    console.log(evento)
    funcoes[evento.tipo](evento.dados)
    res.end()
})

const port = 4200
app.listen(port, () => console.log(`Consulta. Porta ${port}.`))