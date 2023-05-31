var database = require("../database/config");


function totalCadeiraNaSala(idSala) {

    instrucaoSql =
    `select count(idPoltrona) as qtdeTotalSala from Poltrona
        join Sala on fkSala = idSala
        join Hospital on fkHosp = idHosp
            where idSala = ${idSala} and idHosp = 1;
    `;

    return database.executar(instrucaoSql)
}


function cadeirasEmUso(idSala) {

    instrucaoSql =
    `select count(distinct(fkSensor)) as qtde from Registro
        join Sensor on fkSensor = idSensor
        join TipoSensor on Sensor.fkTipoSensor = idTipo
        join Poltrona on fkPoltrona = idPoltrona
        join Sala on fkSala = idSala
            where idSala = ${idSala} and idTipo = 1
            and valor > 0 and dataHora between now() - 200 and now();
    `;

    return database.executar(instrucaoSql)

}


function lotacaoDiariaSala(idSala){
    
    let data = new Date()
    let anoAtual = data.getFullYear()
    let mesAtual = String(data.getMonth() + 1).padStart(2, '0')

    let diaAtual = String(data.getDate()).padStart(2, '0')
    let ultimoDia = String(data.getDate() - 6).padStart(2, '0')
    
    instrucaoSql =
    `select date_format(dataHora, '%d/%m') as dataDiaria, count(dataHora) as contagem from Registro
        join Sensor on fkSensor = idSensor
        join TipoSensor on Sensor.fkTipoSensor = idTipo
        join Poltrona on fkPoltrona = idPoltrona
        join Sala on fkSala = idSala
        join Hospital on fkHosp = idHosp
            where year(dataHora) = ${anoAtual}
              and month(dataHora) = ${mesAtual}
              and day(dataHora) between ${ultimoDia} and ${diaAtual} 
              and idSala = ${idSala} and valor > 0 and idHosp = 1 and idTipo = 1
		    group by dataDiaria
            order by dataDiaria asc limit 6;
    `;

    return database.executar(instrucaoSql)

}


function buscarCadeiras(idSala){

    instrucaoSql =
    `select distinct(pol.idPoltrona), pol.nomePoltrona, reg.valor from Poltrona pol
	    join Sala on fkSala = idSala 
	    join Sensor on fkPoltrona = idPoltrona
        join TipoSensor on Sensor.fkTipoSensor = idTipo
        join Registro reg on fkSensor = idSensor
		    where idSala = ${idSala} and idTipo = 1
		    and dataHora between now() - 200 and now();
    `;

    return database.executar(instrucaoSql)

}

module.exports = {
    totalCadeiraNaSala,
    cadeirasEmUso,
    lotacaoDiariaSala,
    buscarCadeiras 
}
