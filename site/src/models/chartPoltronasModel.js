var database = require("../database/config");


function totalCadeiraNaSala(idSala) {

    instrucaoSql =
    `select count(idPoltrona) as qtdeTotalSala from Poltrona
	    join Sala on fkSala = idSala
        where idSala = ${idSala};
    `;

    return database.executar(instrucaoSql)
}


function cadeirasEmUso(idSala) {

    // Formatação do horário para inserir no banco de dados
    // Está pegando em um intervalo de 5min
    let dataAtual = new Date()
    let dia = dataAtual.getDate().toString().padStart(2, '0')
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
    let ano = dataAtual.getFullYear()

    let hora = dataAtual.getHours()
    let minutoAtual = String(dataAtual.getMinutes()).padStart(2, '0')
    let minutoAntes = String(dataAtual.getMinutes() - 5).padStart(2, '0')
    let miles = dataAtual.getMilliseconds()

    let dataFormatada = `${ano}-${mes}-${dia} ${hora}:${minutoAtual}:${miles}`
    let dataPassada = `${ano}-${mes}-${dia} ${hora}:${minutoAntes}:${miles}`


    instrucaoSql =
    `select count(fkSensor) as qtde from Registro
	    join Sensor on fkSensor = idSensor
        join Sala on fkSala = idSala
        where idSala = ${idSala} and valor > 0 and dataHora between '${dataPassada}' and '${dataFormatada}';
    `;

    return database.executar(instrucaoSql)

}

/*
function getLotacaoSala(idSala) {

    var dadosSala = {
        qtdeVazia: 0,
        qtdeTotal: 0
    }


    if (process.env.AMBIENTE_PROCESSO == "producao") {

        dadosSala.qtdeVazia = cadeirasVazias(idSala)
        dadosSala.qtdeTotal = totalCadeiraNaSala(idSala)

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        dadosSala.qtdeVazia = cadeirasVazias(idSala)
        dadosSala.qtdeTotal = totalCadeiraNaSala(idSala)

    } else {

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return

    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return 

}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
*/

module.exports = {
    totalCadeiraNaSala,
    cadeirasEmUso
    //getLotacaoSala
    //buscarMedidasEmTempoReal  
}
