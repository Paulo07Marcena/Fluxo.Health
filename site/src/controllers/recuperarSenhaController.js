const nodemailer = require("nodemailer")
const path = require("path")

const recuperarSenha = require("../models/recuperarSenhaModel")

const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: "andreylrodrigues@hotmail.com",
        pass: "andrey050405",
    },
});

async function enviarEmail(req, res){
    const { emailUser } = req.body
    const hospital = 
        await recuperarSenha.acharEmail(emailUser)
            .then(item => item)
            .catch(error => res.status(404).json({error: error}))

    if(hospital.length == 0){
        res.status(404).json({msg: "Esse email não esta em uso"})
    }
    else{
        const chamadoRecente = await recuperarSenha.procurarPermissao(hospital[0].idHosp)
        if(chamadoRecente.length > 0){
            res.status(400).json({msg: "Solicitação para recuperar senha feita a menos de 5 minutos"})
        }
        else{
            recuperarSenha.liberarTroca(hospital[0].idHosp).then(() => {
                transporter.sendMail({
                    from: 'andreylrodrigues@hotmail.com',
                    to: emailUser,
                    subject: 'Recuperação de senha - FLUXOHEALTH',
                    text: `
                        Para recuperar sua senha acesse o link abaixo <br>
                        http://localhost:3333/recuperarSenha/${hospital[0].idHosp}
                    `
                }, (error,info) => {
                    error
                        ? res.status(500).json({error: error})
                        : res.status(200).json({msg: 'Email sent: ' + info.response})
                })
            })
        }
    }
}

async function procurarPermissao(req, res){
    const { idHosp } = req.params

    const permissaoTroca = await recuperarSenha.procurarPermissao(idHosp)

    if(permissaoTroca.length == 0){
        res.status(403).json({Error: "Não autorizado"})
    }
    else{
        res.sendFile(path.join(__dirname, "../../public/TrocarSenha.html"))
    }
}

async function trocarSenha(req, res){
    const { idHosp } = req.params
    const { novaSenha } = req.body

    recuperarSenha.procurarPermissao(idHosp).then(response => {
        if(response.length != 0){
            recuperarSenha.trocarSenha(idHosp, novaSenha)
            .then(() => {
                recuperarSenha.removerPermissao(idHosp)
                .then(() => 
                    res.status(200).json({msg: "Dados alterados com sucesso"})    
                )
            })
        }
        else {
            res.status(403).json({Error: "Não autorizado"})
        }
    })
}
module.exports = {
    enviarEmail,
    procurarPermissao,
    trocarSenha
}