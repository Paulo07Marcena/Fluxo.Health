var database = require("../database/config")

// function listarPoltronas(idSala) {

//     var comandoPoltronas = `
//         SELECT count(*) as TotalPoltronas, fkSala FROM poltrona 
//         JOIN Sala on idSala = fkSala
//         JOIN Hospital on fkHosp = idHosp
//         WHERE fkHosp = 1 GROUP BY fkSala;
//     `;
//     console.log('Andrey o tal,', comandoPoltronas)

//     return database.executar(comandoPoltronas);
// }

// function listarPoltronasUso(idSala) {


//     var comandoPoltronasUso =
//         `SELECT count(*) as TotalPoltronasUso from Registro 
//         join Sensor on fkSensor = idSensor
//         join poltrona on fkPoltrona = idPoltrona
//         where DATE(dataHora) = DATE(now()) and 
//         time(now()-500) < time(dataHora) and fkSala = ${idHosp};
//     `;

//     return database.executar(comandoPoltronasUso);
// }

function InfoSalas(idHosp) {

    var instrucao = `
    SELECT
    S.*, 
    (
        SELECT count(*) as TotalPoltronasUso from Registro 
        join Sensor on fkSensor = idSensor
        join TipoSensor on fkTipoSensor = idTipo
        join Poltrona on fkPoltrona = idPoltrona
        where DATE(dataHora) = DATE(now()) and 
        time(now()-100) < time(dataHora) and fkSala = S.idSala
        and idTipo = 1
    ) as totalPoltonasUso,
    (
        SELECT count(*) as TotalPoltronas FROM Poltrona 
        JOIN Sala as SalasPoltrona on SalasPoltrona.idSala = fkSala
        WHERE fkSala = S.idSala GROUP BY fkSala
    )  as TotalPoltronas
    FROM Sala as S JOIN Hospital 
    ON idHosp = S.fkHosp
    Where fkHosp = ${idHosp};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}
module.exports = {
    InfoSalas,
    // listarPoltronasUso,
    // listarPoltronas
}