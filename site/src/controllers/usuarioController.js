var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeHosp = req.body.nomeHospServer;
    var cepHosp = req.body.cepServer;
    var numHosp = req.body.numServer;
    var cnpjHosp = req.body.cnpjServer;
    var loginHosp  = req.body.loginServer;
    var senhaHosp = req.body.senhaServer;
    var plano = req.body.planoServer

    // Faça as validações dos valores
    if (nomeHosp == undefined) {
        res.status(400).send("Insira um nome!");
    } else if (loginHosp == undefined) {
        res.status(400).send("Insira um email!");
    } else if (senhaHosp == undefined) {
        res.status(400).send("Insira um senha!");
    } else if (cepHosp.length != 9) {
        res.status(400).send("Insira um CEP válido!");
    } else if (numHosp.length > 6 || numHosp == undefined) {
        res.status(400).send("Insira um número válido!");
    } 
    // else if (cnpj.length > 14 || cnpj == undefined) {
    //     res.status(400).send("Insira um CNPJ válido!");
    // }
      else if (loginHosp == undefined || loginHosp.indexOf('@') == -1 || loginHosp.length > 65) {
        res.status(400).send("Insira um email válido!");
    } else if (senhaHosp == undefined || senhaHosp.length > 45) {
        res.status(400).send("Insira uma senha válida!");
    } else if (plano == undefined) {
        res.status(400).send("Insira um plano!");
    } 
    
    else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeHosp , cepHosp , numHosp, cnpjHosp , loginHosp , senhaHosp , plano)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    testar
}