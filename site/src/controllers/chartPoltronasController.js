var chartModel = require("../models/chartPoltronasModel");



function totalCadeiras(req, res){

    var idSala = req.params.idSala;
    chartModel.totalCadeiraNaSala(idSala).then(function (resultado) {

        if (JSON.stringify(resultado).length > 0) {
            res.status(200).json(resultado);

        } else {
            res.status(204).send("Nenhum resultado encontrado!")

        }

    }).catch(function (erro) {
        console.log(erro);
        console.log("Total Cadeiras - Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    });

}


function cadeirasEmUso(req, res){

    var idSala = req.params.idSala;
    chartModel.cadeirasEmUso(idSala).then(function (resultado) {

        if (JSON.stringify(resultado).length > 0) {

            res.status(200).json(resultado);

        } else {

            res.status(204).send("Nenhum resultado encontrado!")

        }

    }).catch(function (erro) {
        console.log(erro);
        console.log("Cadeiras em Uso - Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    });

}


function lotacaoDiaria(req, res){

    var idSala = req.params.idSala;
    chartModel.lotacaoDiariaSala(idSala).then(function (resultado) {

        if (JSON.stringify(resultado).length > 0) {

            res.status(200).json(resultado);

        } else {

            res.status(204).send("Nenhum resultado encontrado!")

        }

    }).catch(function (erro) {
        console.log(erro);
        console.log("Cadeiras em Uso - Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    });

}


/*
function pegarLotacao(req, res) {
    var id = req.params.idSala;

    chartModel.getLotacaoSala(id).then(function (resultado) {

        if (JSON.stringify(resultado).length > 0) {

            res.status(200).json(resultado);

        } else {

            res.status(204).send("Nenhum resultado encontrado!")

        }

    }).catch(function (erro) {

        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    });

}
*/



/*
function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
*/

module.exports = {
    totalCadeiras,
    cadeirasEmUso,
    lotacaoDiaria
    // porcentagemLotacao
    // buscarMedidasEmTempoReal
}