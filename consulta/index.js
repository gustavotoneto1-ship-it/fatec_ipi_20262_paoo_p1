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
    },
    RelatoConfirmado: (dados) => {
        const relatos = baseConsulta[dados.avistamentoId]['relatos']
        for (let i = 0; i < relatos.length; i++) {
            if (relatos[i].id === dados.id) {
                relatos[i].confirmacoes = dados.confirmacoes
            }
        }
    }
}

app.get('/avistamentos', (req, res) => {
    res.json(baseConsulta)
})

app.get('/avistamentos/:id', (req, res) => {
    const avistamento = baseConsulta[req.params.id]

    if (avistamento === undefined) {
        return res.status(404).send({ erro: "avistamento não encontrado" })
    }

    res.json(avistamento)
})

app.post('/eventos', function(req, res) {
    const evento = req.body 
    console.log(evento)
    funcoes[evento.tipo](evento.dados)
    res.end()
})

const port = 4200
app.listen(port, () => console.log(`Consulta. Porta ${port}.`))