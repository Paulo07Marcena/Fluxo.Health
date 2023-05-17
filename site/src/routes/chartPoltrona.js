var express = require("express");
var router = express.Router();

var chartController = require("../controllers/chartPoltronasController");

router.get("/totalCadeiras/:idSala", function (req, res) {
    chartController.totalCadeiras(req, res);
});

router.get("/cadeirasEmUso/:idSala", function (req, res) {
    chartController.cadeirasEmUso(req, res);
});


router.get("/lotacaoDiaria/:idSala", function(req, res) {
    chartController.lotacaoDiaria(req, res);
});


// router.get("/tempo-real/:idAquario", function (req, res) {
//     medidaController.buscarMedidasEmTempoReal(req, res);
// })


module.exports = router;