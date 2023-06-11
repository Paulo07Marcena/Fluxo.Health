var salasModel = require("../models/salasModel");

 function listarSalas(req, res) {

    var idHosp = req.params.idHosp;

    salasModel.InfoSalas(idHosp).then(function (resultado) {
        if (resultado) {
            res.status(200).json({msg: resultado})
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
   
}


module.exports = listarSalas
