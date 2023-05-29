var database = require("../database/config");

function acharEmail(UserEmail) {
    const instrucao = `
        SELECT * from Hospital where emailHosp = '${UserEmail}'
    `;
    return database.executar(instrucao);
}

function liberarTroca(idHosp){
    const instrucao = `
        INSERT INTO trocaDeSenhas (fkHospital, concluido, chamadoData) VALUES (${idHosp},0, now())
    `
    return database.executar(instrucao);
}

function procurarPermissao(idHosp) {
    const instrucao = `
        SELECT * from trocaDeSenhas 
        where
            fkHospital = '${idHosp}' and
            concluido = 0 and
            DATE(chamadodata) = DATE(now()) and 
            time(now()-500) < time(chamadodata);
    `;
    return database.executar(instrucao);
}

function atualizarDados(idHosp, novaSenha){
    const instrucao = `
        UPDATE hospital SET senhaHosp = '${novaSenha}' WHERE idHosp = ${idHosp};
    `
    return database.executar(instrucao);
}

function trocarSenha(idHosp, novaSenha){
    const instrucao = `
        UPDATE hospital SET senhaHosp = '${novaSenha}' WHERE idHosp = '${idHosp}' 
    `
    return database.executar(instrucao)
}

function removerPermissao(idHosp){
    const instrucao = `
        UPDATE trocaDeSenhas SET concluido = true WHERE fkHospital = '${idHosp}' 
    `
    return database.executar(instrucao)
}
module.exports = {
    acharEmail,
    liberarTroca,
    procurarPermissao,
    atualizarDados,
    trocarSenha,
    removerPermissao
}