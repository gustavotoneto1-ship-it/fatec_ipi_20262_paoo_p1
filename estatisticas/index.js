const express = require('express')
const app = express()
app.use(express.json())

const totais = {
    avistamentos: 0,
    relatos: 0,
    confirmacoes:0
}
const locais = {}
const baseEstatistica = {}
const funcoes = {
    AvistamentoCriado: (avistamento) => {
        baseEstatistica[avistamento.id] =  avistamento.local
        locais[avistamento.local] = locais[avistamento.local] || {avistamentos: 0, relatos: 0, confirmacoes: 0}
        locais[avistamento.local].avistamentos++
        totais.avistamentos++
    },
    RelatoCriado: (relato) => {
        const local = baseEstatistica[relato.avistamentoId]
        locais[local].relatos++
        totais.relatos++
    },
    RelatoConfirmado: (confirmacao) => {
        const local = baseEstatistica[confirmacao.avistamentoId]
        locais[local].confirmacoes++
        totais.confirmacoes++
    }

}
//GET 
app.get('/estatisticas', (req, res) => {
    res.send({totais, locais})
})
app.get('/estatisticas/destaque', (req, res) => {
    if(totais.avistamentos === 0){
        return res.status(404).send({erro: 'sem dados'})
    }
    let localDestaque = baseEstatistica[1]
    let engajamento = locais[localDestaque].relatos + locais[localDestaque].confirmacoes
    for ( let i = 2; i <= totais.avistamentos; i++){
        const localAtual = baseEstatistica[i]
        const engajamentoAtual = locais[localAtual].relatos + locais[localAtual].confirmacoes
        if(engajamento < engajamentoAtual){
            localDestaque = localAtual
            engajamento = engajamentoAtual
        }
    }
    res.send({local: localDestaque, engajamento: engajamento})
})

//POST
app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    try {
        funcoes[evento.tipo](evento.dados)
    }
    catch (erro) {}
    res.status(200).send({msg: 'ok'})
    
})

const port = 4300
app.listen(port, () => console.log(`Estatistica. Porta ${port}`))