var express = require('express')
var router = express.Router()

var recuperarSenha = require("../controllers/recuperarSenhaController")

router.post("/", async (req, res) => {
    await recuperarSenha.enviarEmail(req,res)
})

router.get("/:idHosp", async (req, res) => {
    await recuperarSenha.procurarPermissao(req, res)
})

router.post("/trocarSenha/:idHosp", async (req, res) => {
    await recuperarSenha.trocarSenha(req, res)
})
module.exports = router
