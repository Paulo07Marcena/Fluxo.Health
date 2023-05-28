var express = require("express");
var router = express.Router();

var salasController = require("../controllers/salasController");

router.get("/listar/:idHosp", function (req, res) {
    salasController(req, res);
});

module.exports=router